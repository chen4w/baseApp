const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';

async function saveBlock(blk,pdb) {
  var blk_data = {
    hash: Buffer.from(blk.stateHash).toString(ECODE_BIN),
    transCount: blk.transactions.length,
    timeStamp: new Date(blk.timestamp.seconds * 1000 - 8 * 3600 * 1000)
  };
  if(blk.previousBlockHash)
    blk_data.preHash = Buffer.from(blk.previousBlockHash).toString(ECODE_BIN);

  //写入区块,
  var obj_blk =await pdb.mutation.createBlock(
    {
      data: blk_data,
    }
  )
  var txs = blk.transactions;
  //写入包含的交易
  for(var i=0; i<txs.length; i++){
    var tx = txs[i];
    var tx_data ={
      txId: tx.txid,
      blockId: blk_data.hash,
      type: tx.type,
      cname: tx.payload.chaincodeID.name,
      action: tx.payload.ctorMsg.function,
      ipt:tx.payload.ctorMsg.args.toString(),
      signature: tx.signature.toString(ECODE_HEX),
      //nodejs只支持到毫秒
      timeStamp: new Date(tx.timestamp.seconds * 1000 - 8 * 3600 * 1000),
      blocker :{connect:{id:obj_blk.id}}
    }
    pdb.mutation.createTransaction(
      {
        data: tx_data,
      }
    )  
    console.log(tx_data)
  }
 console.log(blk_data)  
}

module.exports.saveBlock = saveBlock;