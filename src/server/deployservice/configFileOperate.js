
let fsop = require('fs');
let pathop = require('path');
const cfg = require('config');
let request = require('request');
var os=require('os');

var RepChainPath = cfg.get('bar.NodeService.RepChainSetupPath-win');//'E:\\iscas\\repchain';
if(os.type != 'Windows_NT'){
    RepChainPath = cfg.get('bar.NodeService.RepChainSetupPath-linux');//'/home/iscas/repchain';
}

const keyFileSuffix = cfg.get('bar.NodeService.keyFileSuffix');//'.jks';
const DownloadFileService = cfg.get('bar.NodeService.DownloadFileServiceName');//'getFile';

var nodename = '-1';
var fileinfos = [
    {   filename:RepChainPath + pathop.sep + 'conf' + pathop.sep + 'system.conf',
        fileurl:''},
    {   filename:RepChainPath + pathop.sep + 'jks' + pathop.sep +
                'mykeystore_'+nodename+keyFileSuffix,
        fileurl:''},
    {   filename:RepChainPath + pathop.sep + 'json' + pathop.sep +
                'gensis.json',
        fileurl:''},
    {   filename:RepChainPath + pathop.sep + 'jks' + pathop.sep +
                'mytruststore'+ keyFileSuffix,
        fileurl:''}
];


//判断文件是否存在
function  ExistForFile(filename){
    return new Promise(function (resolve, reject) {
        fsop.exists(filename,function(exists){
            if(exists){
                resolve({result: true});
            }else{
                resolve({result: false});
            }
        });
    });
}

//首先判断文件是否存在，如果存在直接返回，不存在到服务器上下载文件
function CheckFile(filename,fileUrl){
    return new Promise(function (resolve, reject) {
        ExistForFile(filename).then((Result)=>{
            if(!Result.result){
                //获取文件
                getFileFromBackend(fileUrl,filename).then((Result)=>{
                    if(Result.result){
                        //下载文件成功
                        resolve({result: true});
                    }else{
                        //下载文件失败
                        resolve({result: false});
                    }
                });
            }else{
                resolve({result: true});
                console.log(filename + ' is exist ');
            }
        });
    })
}

//从服务器上下载指定的文件到本地
function getFileFromBackend(fileUrl,localfn){
    return new Promise(function (resolve, reject) {
        request(fileUrl).pipe(
        //request(url+'/'+DownloadFileService+'/'+filetype+'/'+fileparam).pipe(
            fsop.createWriteStream(localfn)).on("close", function (err) {
            if(err){
                resolve({result: false});
                console.log('file download failed,url='+url+'/download/'+attchid+',error info='+err);
            }else{
                resolve({result: true});
                console.log("file download success,filename=" + localfn );
            }
        });
    });
}

function  SystemFileIsExist(fileinfos,index,callback){
    if(index < fileinfos.length ){
        CheckFile(fileinfos[index].filename,fileinfos[index].fileurl).then((Result)=>{
            if(Result.result){
                if(fileinfos.length == (index+1)){
                    callback(fileinfos[index].filename,Result.result);
                }else{
                     SystemFileIsExist(fileinfos,index + 1,callback);
                }
            }else{
                callback(fileinfos[index].filename,Result.result);
            }
        });
    }else{
        callback(fileinfos[index-1].filename,true);
    }
}




function ConfigFileMgr(pdb,nodename){
    return new Promise(function (resolve, reject) {
        pdb.query.netPeers({
            where:{
                nodename:nodename
            }
        }
        ).then((data) => {
            
           

            var seedip = 'http://'+data[0].seedip+':'+cfg.get('bar.NodeService.FileServerPort')+'/'+DownloadFileService+'/';
            var localip = 'http://'+data[0].rtGraph+':'+cfg.get('bar.NodeService.FileServerPort')+'/'+DownloadFileService+'/';
            fileinfos[0].fileurl = localip + 'node-config/'+nodename;
            console.log(fileinfos[0].fileurl);
            fileinfos[1].fileurl = localip + 'pkey-file/'+nodename;
            console.log(fileinfos[1].fileurl);
            fileinfos[1].filename = RepChainPath + pathop.sep + 'jks' + pathop.sep +
                                    'mykeystore_'+nodename+keyFileSuffix;
            fileinfos[2].fileurl = seedip + 'mainchain-gensis-file/'+data[0].seedip;
            console.log(fileinfos[2].fileurl);
            fileinfos[3].fileurl = seedip + 'mainchain-certlist-file/'+data[0].seedip;
            console.log(fileinfos[3].fileurl);
            SystemFileIsExist(fileinfos,0,function(cfilename,iserror){
                console.log({filename:cfilename,result: iserror});
                resolve({filename:cfilename,result: iserror});
            });
        });
    });
}

module.exports.ConfigFileMgr = ConfigFileMgr;
module.exports.RepChainPath = RepChainPath;

