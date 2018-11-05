var parseHocon = require('hocon-parser');
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
})



