

var request = require('request');
var fs = require('fs');
 
function getFileToBackend(url,attchid,localfn,cb){
    request(url+'/download/'+attchid).pipe(fs.createWriteStream(localfn)).on("close", function (err) {
        if(err){
            console.log('file download failed,url='+url+'/download/'+attchid+',error info='+err);
        }else{
            console.log("file download success,filename=" + localfn );
        }
        cb(err);
    });
}

module.exports.getFileToBackend = getFileToBackend;

function test_getFileToBackend(){
    var url = 'http://localhost:5000';
    var attchid = 'cjm75o2y4001d0a46feptsfq6';
    var localfn = '/Users/jiangbuyun/testdownload.txt';
    getFileToBackend(url,attchid,localfn,function(err){
        if(err){
            console.log('file download failed,url='+url+'/download/'+attchid+',error info='+err);
        }else{
            console.log("file download success,filename=" + localfn );
        }
    });
}

test_getFileToBackend();