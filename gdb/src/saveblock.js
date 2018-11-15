const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';
const NET_DEFAULT = "DEFAULT_NET";
const { RestAPI } = require('./rclink/rest')

function updateNetInfo(prisma, info, netId) {
  prisma.mutation.updateNetwork({
    where: { id: netId },
    data: info
  });
}

var default_NetId;
var blockCount = 0;
var transCount = 0;

async function getNetInfo(api_url,prisma, netName) {
  const ra = new RestAPI(api_url);
  await ra.chaininfo().then(ci=>{
    blockCount = parseInt(ci.result.height);
    transCount = parseInt(ci.result.totalTransactions);
  });
  //检索组网记录，如果不存在创建之
  const name = netName || NET_DEFAULT;
  var nets, net0;
  await prisma.query.networks({ where: { name: name } }).then(result => {
    nets = result
  }).catch(err => console.log(err));

  if (nets.length > 0) {
    default_NetId = nets[0].id;
    return nets[0];
  } else {
    await prisma.mutation.createNetwork({
      data: {
        name: name,
        syncHeight: 1,
        seedip: "",
        blockCount: 0,
        transCount: 0
      }
    }).then(result => { net0 = result }).catch(err => console.log(err));
    default_NetId = net0.id;
    return net0;
  }
}

var tm_lastBlock = null;
async function saveBlock(blk, prisma, netId) {
  var blk_data = {
    hash: Buffer.from(blk.stateHash).toString(ECODE_BIN),
    transCount: blk.transactions.length,
    timeStamp: new Date(blk.timestamp.seconds * 1000 - 8 * 3600 * 1000),
    preHash: null
  };
  if (blk.previousBlockHash)
    blk_data.preHash = Buffer.from(blk.previousBlockHash).toString(ECODE_BIN);

  //写入区块,
  var obj_blk = await prisma.mutation.createBlock(
    {
      data: blk_data,
    }
  )
  var txs = blk.transactions;
  //写入包含的交易
  for (var i = 0; i < txs.length; i++) {
    var tx = txs[i];
    var tx_data = {
      txId: tx.txid,
      blockId: blk_data.hash,
      type: tx.type,
      cname: tx.payload.chaincodeID.name,
      action: tx.payload.ctorMsg.function,
      ipt: tx.payload.ctorMsg.args.toString(),
      signature: tx.signature.toString(ECODE_HEX),
      //nodejs只支持到毫秒
      timeStamp: new Date(tx.timestamp.seconds * 1000 - 8 * 3600 * 1000),
      blocker: { connect: { id: obj_blk.id } }
    }
    prisma.mutation.createTransaction(
      {
        data: tx_data,
      }
    )
    //console.log(tx_data)
  }
  //来自push,新出区块
  if(!netId){
    blockCount += 1;
    transCount += blk.transactions.length;
    var tm_now = process.uptime();
    var tps =0;
    if(tm_lastBlock!==null){
      var tm_span = tm_now - tm_lastBlock;
      console.log('tm_span:'+ tm_span);

      if(tm_span < 10000){
        tps = blk.transactions.length / tm_span;
        tps = Math.floor(tps * 10) / 10 
      }
    }
    console.log('tps:'+ tps);
    tm_lastBlock = tm_now;
    console.log('tm_lastBlock:'+ tm_lastBlock);

    updateNetInfo(
      prisma,
      { blockCount: blockCount, transCount: transCount, tps: tps},
      default_NetId)  
  }
  //console.log(blk_data)  
}

module.exports.saveBlock = saveBlock;
module.exports.updateNetInfo = updateNetInfo;
module.exports.getNetInfo = getNetInfo;