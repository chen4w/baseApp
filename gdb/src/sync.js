const protobuf = require("protobufjs")
const { EventTube } = require('./rclink/events')
const { saveBlock,updateNetInfo ,getNetInfo} = require('./saveblock')
const { RestAPI } = require('./rclink/rest')

const root_proto = protobuf.loadSync("protos/peer.proto");
const Message = root_proto.lookupType("rep.protos.Event");
const Block = root_proto.lookupType("rep.protos.Block");
const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';

/**
 * 订阅方式同步区块数据
 * @param {*} ws_url 
 */
function startSyncPush(ws_url, prisma) {
    //启动push方式的实时区块数据同步
    new EventTube(ws_url, function (evt) {
        var msg = Message.decode(evt.data);
        //出块通知 TODO 确保块内全部交易写入
        if (msg.action == 2 && msg.from != 'Block') {
            var blk = msg.blk;
            saveBlock(blk, prisma)
        }
    })
}

function startSyncPull(api_url, prisma) {
    //启动pull方式的区块数据同步
    var h_sync = 0;
    const ra = new RestAPI(api_url);
    //获得当前同步高度
    getNetInfo(api_url, prisma).then(net0 => {
        console.log(net0)
        pullBlock(ra, net0.syncHeight, prisma, net0.id);    
    })
}

var tm_pull = null;
const span_pull = 200;
function pullBlock(ra, h, prisma, netId) {
    console.log('pull Block ' + h);
    if (!tm_pull) {
        clearTimeout(tm_pull);
        tm_pull = null;
    }
    ra.blockStream(h).then(res => {
        const buf = res;
        var blk = Block.decode(buf);
        var prevHash = blk.previousBlockHash ? Buffer.from(blk.previousBlockHash).toString(ECODE_BIN) : null
        //如果区块不存在，保存之
        prisma.exists.Block({ preHash: prevHash }).then(b_exist => {
            console.log('b_exist:' + b_exist)
            if (!b_exist) {
                saveBlock(blk, prisma,netId);
            } else {
                console.log('block[' + prevHash + '] exists.')
            }
            updateNetInfo(prisma,{syncHeight:h},netId);
            setTimeout(function () {
                pullBlock(ra, h + 1, prisma,netId );
            }, span_pull);
        });
    }).catch(function (err) {
        console.log(err);
        setTimeout(function () {
            pullBlock(ra, h, prisma, netId);
        }, span_pull);
    });

}

module.exports.startSyncPull = startSyncPull;
module.exports.startSyncPush = startSyncPush;