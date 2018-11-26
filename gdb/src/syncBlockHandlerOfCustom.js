
//简单连接第三方数据库样例
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'prisma',
  database : 'mysql'//
});
 
connection.connect();
 
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The name is: ', results[0].User);
});

function  TranscationHandler(blkhash,tx){
    console.log('blkhash='+blkhash);
    console.log('txid='+tx.txid);
    console.log('type='+tx.type);
    console.log('cname='+tx.payload.chaincodeID.name);
    //todo 保存交易信息到第三方数据库
}

exports.TranscationHandler = TranscationHandler;