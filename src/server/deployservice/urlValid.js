

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
                resolve({result: true});
            } else {
                resolve({result: true});
            }
        }).on('error', (e) => {
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
