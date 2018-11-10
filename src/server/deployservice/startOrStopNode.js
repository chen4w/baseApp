
const {ConfigFileMgr,RepChainPath} = require('./configFileOperate.js')
const {RequestOfValid} = require('./urlValid.js')

pathop = require('path');
var os=require('os');

function  StartOrStopService(req, res, pdb){
    console.log('entry service');
    var nodename = req.params.nodename;
    var actionname = req.params.actionname;
    console.log('actionname='+actionname);
    
    var localurl = 'http://localhost:8081/web/g1.html';

    if(actionname == 'start'){
        RequestOfValid(localurl).then((validResult)=>{
            if(validResult.validResult){
                console.log('server was started');
                pdb.mutation.updateManyNetPeers({data:{status:'started'},where:{nodename:nodename}}).then((data)=>{
                    //console.log('start finish');
                    setTimeout(function(){handlerOfCmd(true);},2000);
                });
            }else{
                ConfigFileMgr(pdb,nodename).then((fileResult)=>{
                    if(fileResult.result){
                        console.log('server starting ....');
                        if(os.type == 'Windows_NT'){
                            shellFile(RepChainPath+pathop.sep+'startup_repchain.bat',nodename,handlerOfCmd,req,res,pdb,true);
                        }else{
                            shellFile(RepChainPath+pathop.sep+'startup_repchain.sh',nodename,handlerOfCmd,req,res,pdb,true);
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
    }else if(actionname == 'stop'){
        RequestOfValid(localurl).then((validResult)=>{
            console.log(validResult);
            if(validResult.result){
                console.log('server stopping .....');
                if(os.type == 'Windows_NT'){
                    shellFile(RepChainPath+pathop.sep+'shutdown_repchain.bat',nodename,handlerOfCmd,req,res,pdb,false);
                }else{
                    shellFile(RepChainPath+pathop.sep+'shutdown_repchain.sh',nodename,handlerOfCmd,req,res,pdb,false);
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

function shellFile(filename,nodename,callbackfunc,req,res,pdb,isstart){
    var exec = require('child_process').execFile;
    exec(filename,[nodename],{encoding:'utf8',cwd:RepChainPath,windowsHide:true}
    /*,function (err,stdout,stderr){
        callbackfunc(err, stdout, stderr,req,res,pdb,isstart);
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
