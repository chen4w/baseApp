

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
        //console.log('1');
        let error;
        if (statusCode == 200) {
            resolve({result: false});
        } else {
            resolve({result: false});
        }
        }).on('error', (e) => {
            //console.log('2');
            resolve({result: false});
        });
    });
}

module.exports.ValidServer = ValidServer;

let url = 'http://localhost:8080/wxg_digimus/login.html';
ValidServer(url,function(r){
    console.log(r.result);
});
