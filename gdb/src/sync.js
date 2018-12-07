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
const protobuf = require("protobufjs")
const { EventTube } = require('./rclink/events')
const { BlockStorager} = require('./saveblock')
const { RestAPI } = require('./rclink/rest')

const root_proto = protobuf.loadSync("../public/protos/peer.proto");//单步调试增加了gdb目录
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
        this.isPulling = false;
        this.isPush = false;
        return this;
    }



    startSyncPush() {
        var self = this;
        //启动push方式的实时区块数据同步
        new EventTube(this.ws_url, function (evt) {
            //console.log('+++++++entry evt');
            var msg = Message.decode(evt.data);
            //console.log('$$$$$$$$$$message decode');
            //出块通知 TODO 确保块内全部交易写入
            //console.log(JSON.stringify(msg));
            //console.log('msg.action='+msg.action+',msg.to='+msg.to);
            if (msg.action == 2 && msg.from != 'Block') {
                self.storage.setBlockInc();
                //var blk = msg.blk;
                //console.log('########block');
                if(!self.isPulling){
                    //console.log('push start pull');
                    self.push = false;
                    self.StartPullBlocks();
                    console.log('push start pull ok');
                }else{
                    self.push = true;
                    console.log('pushing');
                }
            }
        })
    }

    async StartPullBlocks() {
        //启动pull方式的区块数据同步
        //console.log(JSON.stringify(this.storage));
        //console.log(this);
        var self = this;
        this.isPulling = true;
        var h_local = this.storage.getLastSyncHeight();
        console.log('h_local='+h_local);
        
            var h_remote = await this.getNetWorkHeight().catch(function(err){
                self.isPulling = false;
            });
            if(h_remote > -1){
                console.log("remoteheight="+h_remote);
                if(h_remote > h_local){
                    //需要拉取
                    this.storage.setBlockCount(h_remote);
                    const ra = new RestAPI(this.api_url);
                    console.log('prepare pull height='+(h_local+1));
                    this.pullBlock(ra, h_local+1, h_remote);
                }else{
                    this.isPulling = false;
                    console.log('StartPullBlocks,pull finish');
                }
            }
        
    }

    async getNetWorkHeight(){
        const ra = new RestAPI(this.api_url);
        var ci = await ra.chaininfo();
        if(ci != null){
            console.log(JSON.stringify(ci));
            return ci.result.height;
        }else{
            return -1;
        }
    }

    async BlockToStore(res){
        const buf = res;
        var blk = Block.decode(buf);

        var crypto = require('crypto');
        var sha = crypto.createHash('SHA256');
        var blkHash = sha.update(buf).digest('hex'); 

        return await this.storage.saveBlock(blk,blkHash);
    }

    async pullBlock(ra, h, maxh) {
        var self = this;
        console.log('pullBlock,prepare pull height='+(h));        
        var res = await ra.blockStream(h).catch(function(err){
            self.isPulling = false;
        });
        var r = await this.BlockToStore(res);
        if(r == 1){
            if(h < maxh){
                this.pullBlock(ra, h + 1, maxh );
            }else{
                this.isPulling = false;
                console.log('pullBlock,pull finish');
            }
        }    
    }

    
    
}


exports.syncher = syncher;
