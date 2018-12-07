
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