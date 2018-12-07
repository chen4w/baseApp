/*
 * Copyright  2018 Linkel Technology Co., Ltd, Beijing
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BA SIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const ECODE_BIN = 'binary';
const ECODE_HEX = 'hex';
const { RestAPI } = require('./rclink/rest');


class BlockStorager{

  constructor(prisma,pullUrl) {
    this.prisma = prisma;
    this.default_NetId =  "";
    this.default_NetName = "DEFAULT_NET";
    var URL = require('url');
    var p = URL.parse(pullUrl);
    this.seedip = p.hostname;
    console.log(this.seedip);
    
    this.lastBlockHash = '';
    this.lastheight = 0;
    this.transCount = 0;
    this.lastBlockTime = 0;
    this.blockCount = 0;
    this.tps = 0.0;
    this.tm_lastBlock=process.uptime();
    return this;
  }

  getLastSyncHeight(){
    return this.lastheight;
  }

  getLastBlockHash(){
    return this.lastBlockHash;
  }

  setBlockCount(blkcount){
    this.blockCount = ~~blkcount;
    console.log(this.blockCount);
  }

  setBlockInc(){
    this.blockCount = this.blockCount+1;
    console.log(this.blockCount);
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
      if(isNaN(net.syncHeight)){
        this.lastheight = 0;
      }else   this.lastheight = net.syncHeight;
      this.lastBlockHash = net.lastBlockHash;
      if(isNaN(net.transCount)){
        this.transCount = 0;
      }else   this.transCount = net.transCount;
      
      this.lastBlockTime = net.lastBlockTime;
      if(isNaN(net.tps)){
        this.tps = 0;
      }else   this.tps = net.tps;
      
    }
    console.log('storager init finish');
  };


  async saveBlock(blk,blkHash){
      var blk_data = {
        hash: blkHash,
        transCount: blk.transactions.length,
        timeStamp: new Date(blk.timestamp.seconds * 1000 - 8 * 3600 * 1000),
        preHash: null
      };
      if (blk.previousBlockHash)
        blk_data.preHash = Buffer.from(blk.previousBlockHash).toString(ECODE_BIN);
      //判断当前的块是不是能够接到最后一个块
      if(blk_data.preHash == this.lastBlockHash){
        //可以保存,继续检查该块是否存在
        await this.saveBlockForOnly(blk_data,blk);
        await this.refreshCache4Async(blk,blkHash);
        console.log('save block success,block height='+this.lastheight);
        return 1;
      }else{
        console.log('do not save ,current block is not next block,reset pull,please');
        return 0;
      }
  }

  async refreshCache4Async(blk,blkHash){
    //console.log('netid='+this.default_NetId);
    var net_data = this.statisNetData(blk,blkHash);
    //console.log(net_data);
    await this.prisma.mutation.updateNetwork({
      where: { id: this.default_NetId },
      data: net_data
    });
    this.lastheight = net_data.syncHeight;
    this.lastBlockHash = net_data.lastBlockHash;
    this.transCount = net_data.transCount;
    this.lastBlockTime = net_data.lastBlockTime;
    this.tps = net_data.tps;
  }

  statisNetData(blk,blkHash){
    /*var tps =0.0;
    //console.log('blk.timestamp='+JSON.stringify( blk.timestamp));
    var ctime = ~~blk.timestamp.seconds;
    //console.log('ctime='+ctime);
    var tm_span = ctime - this.lastBlockTime;
    if(tm_span >  0){
      tps = blk.transactions.length / tm_span;
      tps = Math.floor(tps * 10) / 10;
    }*/
    
    var tps =0;
    var ctime = ~~blk.timestamp.seconds;
    var tm_now = process.uptime();
    if(this.tm_lastBlock!==null){
      var tm_span = tm_now - this.tm_lastBlock;
      console.log('tm_span:'+ tm_span);

      if(tm_span < 10000){
        tps = blk.transactions.length / tm_span;
        tps = Math.floor(tps * 10) / 10 
      }
    }
    console.log('tps:'+ tps);
    this.tm_lastBlock = tm_now;

    console.log('this.blockcount='+this.blockCount);

    var net_data = { 
      syncHeight: ~~this.lastheight+1, 
      blockCount:this.blockCount, 
      transCount: ~~this.transCount + blk.transactions.length, 
      lastBlockHash:blkHash,
      lastBlockTime:ctime,
      tps: tps
    }
    return net_data;
  }
  
  async saveBlockForOnly(blk_data,blk){
    var isexist = await this.prisma.exists.Block({ hash: blk_data.hash });
    if (!isexist) {
      var blk_obj = await this.prisma.mutation.createBlock(
        {
          data: blk_data,
        }
      );
      await this.saveTranscations(blk.transactions,blk_data.hash,blk_obj.id);
    }
  }

  async saveTranscations(txs,blkHash,blkid){
    for (var cidx = 0; cidx < txs.length; cidx++) {
      var tx = txs[cidx];
      var tx_data = {
        txId: tx.txid,
        blockId: blkHash,
        type: tx.type,
        cname: tx.payload.chaincodeID.name,
        action: tx.payload.ctorMsg.function,
        ipt: tx.payload.ctorMsg.args.toString(),
        signature: tx.signature.toString(ECODE_HEX),
        //nodejs只支持到毫秒
        timeStamp: new Date(tx.timestamp.seconds * 1000 - 8 * 3600 * 1000),
        blocker: { connect: { id: blkid } }
      };
      var isexist = await this.prisma.exists.Transaction({ txId: tx.txid });
      if(!isexist){
        await this.prisma.mutation.createTransaction(
          {
            data: tx_data,
          }
        );
      }
      console.log('save trans i='+cidx+',txid='+tx_data.txId);
    }
  }

  
}

exports.BlockStorager = BlockStorager;

