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


const http = require('http');

function ValidServer(url,callback){
    RequestOfValid(url).then((validResult)=>{
        callback(validResult);
    });
}

function RequestOfValid(url){
    return new Promise(function (resolve, reject) {
        http.get(url, (res) => {
            const { statusCode } = res;

            if (statusCode == 200) {
                //console.log('url  200');
                resolve({result: true});
            } else {
                //console.log('url  300');
                resolve({result: true});
            }
        }).on('error', (e) => {
            //console.log('url error');
            resolve({result: false});
        });
    });
}

module.exports.ValidServer = ValidServer;
module.exports.RequestOfValid = RequestOfValid;

let url = 'http://localhost:8080/wxg_digimus/login.html';
ValidServer(url,function(r){
    console.log(r.result);
});
