/*var parseHocon = require('hocon-parser');
var fs =require("fs");
var filename = 'C:\\RepChain_devlop_env\\scala_workspace\\repchain\\conf\\system.conf';
var wrfilename = 'e:\\tempfile.txt';
fs.readFile(filename,{flag:'r+',encoding:'utf-8'},function(err,data){
    if(err){
        console.log("文件失败，filename="+filename);
    }else{
        var obj = parseHocon(data);
        console.log(obj);
       
        var data1 = obj +'-------sdflkdfjs';
        fs.writeFile(wrfilename,data1,{encoding:'utf-8'},function(err){
           console.log("文件写入成功");
        })
    }
})*/

var URL = require('url');
var urlstr = 'http://localhost:4466';
var p = URL.parse(urlstr);
console.log(p.hostname);


var crypto = require('crypto');
var sha = crypto.createHash('SHA256');

var message = 'hello';
var digest = sha.update(message, 'utf8').digest('hex'); 

console.log(digest);

