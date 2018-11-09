
const {ConfigFileMgr} = require('./configFileOperate.js')
const {RequestOfValid} = require('./urlValid.js')

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
            }else{
                ConfigFileMgr(pdb,nodename).then((fileResult)=>{
                    if(fileResult.result){
                        console.log('server starting ....');

                    }else{
                        console.log('file system is error,startup failed,contact admin');
                    }
                });
            }
        });
    }else if(actionname == 'stop'){
        RequestOfValid(localurl).then((validResult)=>{
            if(validResult.validResult){
                console.log('server stopping .....');
            }else{
                console.log('server was stopped');
            }
        });
    }
}



module.exports.StartOrStopService = StartOrStopService;
