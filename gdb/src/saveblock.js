const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';
const { RestAPI } = require('./rclink/rest');
const {URL} = require('url');

class BlockStorager{

  constructor(prisma,pullUrl) {
    this.prisma = prisma;
    this.default_NetId =  "";
    this.default_NetName = "DEFAULT_NET";
    var p = URL.parse(pullUrl);
    this.seedip = p.hostname;
    console.log(this.seedip);
    
    this.lastBlockHash = '';
    this.lastheight = 0;
    this.transCount = 0;
    this.lastBlockTime = 0;
    this.tps = 0.0;
  }

  async InitStorager() {
    var net = null;
    await this.prisma.query.networks({ where: { seedip: this.seedip } }).then(result => {
      if(result != null && result.length > 0){
        net = result[0];
      }
    }).catch(err => console.log(err));

    if(net == null){
      await this.prisma.mutation.createNetwork({
        data: {
          name: this.default_NetName,
          syncHeight: 0,
          seedip: this.seedip,
          lastBlockHash:'',
          lastBlockTime:0,
          tps:0.0,
          blockCount: 0,
          transCount: 0
        }
      }).then(result => { net = result }).catch(err => console.log(err));
    }

    if(net != null){
      this.default_NetId = net.id;
      this.default_NetName = net.name;
      this.lastheight = net.syncHeight;
      this.lastBlockHash = net.lastBlockHash;
      this.transCount = net.transCount;
      this.lastBlockTime = net.lastBlockTime;
      this.tps = net.tps;
    }
    console.log('storager init finish');
  }

  getLastHeight(){
    retrun this.lastheight;
  }

  getLastBlockHash(){
    return this.lastBlockHash;
  }


  async saveBlock(blk,blkHash){
    var blk_data = {
      hash: blkHash,
      transCount: blk.transactions.length,
      timeStamp: new Date(blk.timestamp.seconds * 1000 - 8 * 3600 * 1000),
      preHash: null
    };
    if (blk.previousBlockHash)
      blk_data.preHash = Buffer.from(blk.previousBlockHash).toString(ECODE_BIN);
    if(blk_data.preHash == this.lastBlockHash){
      //可以保存,继续检查该块是否存在
      this.prisma.exists.Block({ hash: blk_data.hash }).then(b_exist => {
        if (!b_exist) {
            //不存在可以继续保存，先保存交易，后保存块
            saveTranscations(txs,0).then(rdata => {
              if(rdata.result){
                await prisma.mutation.createBlock(
                  {
                    data: blk_data,
                  }
                );
                refreshCache(blk,blkHash);
                console.log('save block success,block height='+this.lastheight);
                return true;
              }else{
                console.log('save transcation failed');
                return false;
              }
            });
        } else {
          //已经存在了，修改最后缓存信息
          refreshCache(blk,blkHash);
          console.log('block[' + prevHash + '] exists.');
          return true;
        }
      });
    }else{
      console.log('do not save ,current block is not next block,reset pull,please');
      return false;
    }
  }

  async refreshCache(blk,blkHash){
    var net_data = statisNetData(blk,blkHash);
    await this.prisma.mutation.updateNetwork({
      where: { id: netId },
      data: info
    });
    this.lastheight = net_data.syncHeight;
    this.lastBlockHash = net_data.lastBlockHash;
    this.transCount = net_data.transCount;
    this.lastBlockTime = net_data.lastBlockTime;
    this.tps = net_data.tps;
  }

  statisNetData(blk,blkHash){
    var tps =0.0;
    var ctime = blk.timestamp.toInt();
    var tm_span = ctime - this.lastBlockTime;
    //if(tm_span < 10000){
      tps = blk.transactions.length / tm_span;
      tps = Math.floor(tps * 10) / 10;
    /*}else{
      tps = this.tps;
    }*/

    var net_data = { 
      syncHeight: this.syncHeight+1, 
      transCount: this.transCount + blk.transactions.length, 
      lastBlockHash:blkHash,
      lastBlockTime:ctime,
      tps: tps
    }
    return net_data;
  }
  
  saveTranscations(txs,cidx){
    return new Promise(function (resolve, reject) {
      if(txs != null && txs.length > cidx){
        var tx = txs[cidx];
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
        };

        this.prisma.exists.Transaction({ txId: tx.txid }).then(t_exist => {
          if (!t_exist) {
            this.prisma.mutation.createTransaction(
              {
                data: tx_data,
              }
            ).then((data)=>{
              if((txs.length - 1) == cidx){
                resolve({result: true});
              }else{
                saveTranscations(txs,cidx+1);
              }
            }).catch(err => {
                console.log(err);
                resolve({result: false});
            });
          } else {
              console.log('transcation[' + tx.txid + '] exists.');
              if((txs.length - 1) == cidx){
                resolve({result: true});
              }else{
                this.saveTranscations(txs,cidx+1);
              }
          }
        }).catch(err =>{
          console.log(err);
          resolve({result: false});
        });
      }else{
        resolve({result: true});
      }
    }
  }
}

exports.BlockStorager = BlockStorager;

