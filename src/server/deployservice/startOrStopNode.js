
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
const {ConfigFileMgr,RepChainPath} = require('./configFileOperate.js')
const {RequestOfValid} = require('./urlValid.js')

const cfg = require('config');

pathop = require('path');
var os=require('os');

function NodeStatusChangeHandler(pdb,data){
    console.log('entry subscribe event');
    console.log(JSON.stringify(data.data.netPeer, null, 2));
    console.log('entry subscribe handler');
    console.log(data.data.netPeer);
    var nodedata = data.data.netPeer;
    if(nodedata != null){
        if(nodedata.mutation == "UPDATED"){
            if(nodedata.previousValues.status != nodedata.node.status){
                if(nodedata.node.status == 'starting' || nodedata.node.status == 'stopping')
                    //进入处理
                    UpdateService(pdb,nodedata.node);
            }
        }
    }
}


function  UpdateService(pdb,nodedata){
    console.log('entry service');
    var nodename = nodedata.nodename;
    var actionname = nodedata.status;
    console.log('actionname='+actionname);
    
    var localurl =  'http://'+nodedata.rtGraph + cfg.get('bar.NodeService.ValidServicPath');//  'http://localhost:8081/web/g1.html';
    //console.log('valid url='+localurl);

    if(actionname == 'starting'){
        RequestOfValid(localurl).then((validResult)=>{
            if(validResult.validResult){
                console.yarnlog('server was started');
                pdb.mutation.updateManyNetPeers({data:{status:'started'},where:{nodename:nodename}}).then((data)=>{
                    //console.log('start finish');
                    setTimeout(function(){handlerOfCmd(true);},2000);
                });
            }else{
                ConfigFileMgr(pdb,nodename).then((fileResult)=>{
                    if(fileResult.result){
                        console.log('server starting ....');
                        if(os.type == 'Windows_NT'){
                            shellFile(RepChainPath+pathop.sep+'startup_repchain.bat',nodename,handlerOfCmd,pdb,true);
                        }else{
                            shellFile(RepChainPath+pathop.sep+'startup_repchain.sh',nodename,handlerOfCmd,pdb,true);
                        }
                        pdb.mutation.updateManyNetPeers({data:{status:'started'},where:{nodename:nodename}}).then((data)=>{
                            //console.log('start finish');
                            setTimeout(function(){handlerOfCmd(true);},2000);
                        });
                    }else{
                        console.log('file system is error,startup failed,contact admin');
                    }
                });
            }
        });
    }else if(actionname == 'stopping'){
        RequestOfValid(localurl).then((validResult)=>{
            console.log(validResult);
            if(validResult.result){
                console.log('server stopping .....');
                if(os.type == 'Windows_NT'){
                    shellFile(RepChainPath+pathop.sep+'shutdown_repchain.bat',nodename,handlerOfCmd,pdb,false);
                }else{
                    shellFile(RepChainPath+pathop.sep+'shutdown_repchain.sh',nodename,handlerOfCmd,pdb,false);
                }
                pdb.mutation.updateManyNetPeers({data:{status:'stopped'},where:{nodename:nodename}}).then((data)=>{
                    //console.log('stop finish');
                    setTimeout(function(){handlerOfCmd(false);},2000);
                });
            }else{
                console.log('server was stopped');
                pdb.mutation.updateManyNetPeers({data:{status:'stopped'},where:{nodename:nodename}}).then((data)=>{
                    //console.log('stop finish');
                    setTimeout(function(){handlerOfCmd(false);},2000);
                });
            }
        });
    }
}

function  StartOrStopService(req, res, pdb){
    //reset api 来启动服务暂时不实现，通过订阅方式已经实现
}

function shellFile(filename,nodename,callbackfunc,pdb,isstart){
    //console.log(filename);
    var exec = require('child_process').execFile;
    exec(filename,[nodename],{encoding:'utf8',cwd:RepChainPath,windowsHide:true}
    /*,function (err,stdout,stderr){
        callbackfunc(err, stdout, stderr,pdb,isstart);
    }*/
    );
}

function  handlerOfCmd(isstart){
    if(isstart){
        console.log('start finish');
    }else{
        console.log('stop finish');
    }
}

module.exports.StartOrStopService = StartOrStopService;
module.exports.NodeStatusChangeHandler = NodeStatusChangeHandler;

