const protobuf = require("protobufjs")
const { EventTube } = require('./rclink/events')
const { BlockStorager} = require('./saveblock')
const { RestAPI } = require('./rclink/rest')

const root_proto = protobuf.loadSync("protos/peer.proto");//单步调试增加了gdb目录
const Message = root_proto.lookupType("rep.protos.Event");
const Block = root_proto.lookupType("rep.protos.Block");
const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';


class syncher{
    
    constructor(prisma,api_url,ws_url) {
        this.prisma = prisma;
        this.api_url = api_url;
        this.ws_url = ws_url;
        this.storage = new BlockStorager(prisma,this.api_url);
        this.storage.InitStorager();
        return this;
    }

    startSyncPush() {
        //启动push方式的实时区块数据同步
        new EventTube(this.ws_url, function (evt) {
            var msg = Message.decode(evt.data);
            //出块通知 TODO 确保块内全部交易写入
            if (msg.action == 2 && msg.from != 'Block') {
                var blk = msg.blk;
                if(this.isPulling)
                if(this.cacheBlks.length < this.cacheMaxLength){
                    this.cacheBlks.push(blk);
                }
            }
        })
    }

    async StartPullBlocks() {
        //启动pull方式的区块数据同步
        //console.log(JSON.stringify(this.storage));
        //console.log(this);
        var h_local = this.storage.getLastSyncHeight();
        console.log('h_local='+h_local);
        var h_remote = await this.getNetWorkHeight();
        if(h_remote > -1){
            console.log("remoteheight="+h_remote);
            if(h_remote > h_local){
                //需要拉取
                const ra = new RestAPI(this.api_url);
                console.log('prepare pull height='+(h_local+1));
                this.pullBlock(ra, h_local+1, h_remote);
            }
        }
            
        
        
    }

    async getNetWorkHeight(){
        const ra = new RestAPI(this.api_url);
        var ci = await ra.chaininfo();
        if(ci != null){
            return ci.result.height;
        }else{
            return -1;
        }
    }

    async BlockToStore(res,h,maxh){
        const buf = res;
        var blk = Block.decode(buf);

        var crypto = require('crypto');
        var sha = crypto.createHash('SHA256');
        var blkHash = sha.update(buf).digest('hex'); 

        await this.storage.saveBlock(blk,blkHash);
    }

    async pullBlock(ra, h, maxh) {
        console.log('prepare pull height='+(h));        
        var res = await ra.blockStream(h);
        await this.BlockToStore(res,h,maxh);
            
        if(h <= maxh){
            this.pullBlock(ra, h + 1, maxh );
        }        
    }

    
    
}


exports.syncher = syncher;
