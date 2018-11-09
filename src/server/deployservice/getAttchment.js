

var fs = require('fs');
var path = require('path');
var count = 1;
function getFileForfileType(req, res, pdb,filedir){
    var ftype = req.params.filetype;
    var aid = req.params.attchmentid;
    count++;
    console.log('ftype='+ftype+",aid="+aid+",coutn"+count);
    if(ftype == 'pkey-file'){
        console.log('ftype='+ftype);
        pdb.query.netPeers({where:{
            nodename:aid
          }}, `{ id keypair{id url} }`
        ).then((data) => {
            var  pkfileid = '';
            var  url = '';
            if(data != null & data.length == 1 ){
                pkfileid = data[0].keypair.id;
                url = data[0].keypair.url;
            }
            expFile(res,url,pkfileid,filedir);
          });
    }else if(ftype == 'node-config'){
        pdb.query.netPeers({where:{
            nodename:aid
          }}, `{ id config{id url} }`
        ).then((data) => {
            var  cffileid = '';
            var  url = '';
            if(data != null & data.length == 1 ){
                cffileid = data[0].config.id;
                url = data[0].config.url;
            }
            expFile(res,url,cffileid,filedir);
          });
    }else if(ftype == 'mainchain-certlist-file'){
        pdb.query.networks({where:{
            seedip:aid
          }}, `{ id certList{id url} }`
        ).then((data) => {
            var  certlistfileid = '';
            var  url = '';
            if(data != null & data.length == 1 ){
                certlistfileid = data[0].certList.id;
                url = data[0].certList.url;
            }
            expFile(res,url,certlistfileid,filedir);
          });
    }else if(ftype == 'mainchain-gensis-file'){
        pdb.query.networks({where:{
            seedip:aid
          }}, `{ id genesisBlock{id url} }`
        ).then((data) => {
            var  genesisfileid = '';
            var  url = '';
            if(data != null & data.length == 1 ){
                genesisfileid = data[0].genesisBlock.id;
                url = data[0].genesisBlock.url;
            }
            expFile(res,url,genesisfileid,filedir);
          });
    }
    
}

function getAttchForFileId(aid,res,pdb,filedir){
    pdb.query.files({
        where:{
          id:aid
        }
      }
    ).then((data) => {
        var  filerealname = '';
        if(data != null & data.length == 1 ){
            filerealname = data[0].url;
        }
        expFile(res,filerealname,aid,filedir);
      });
}

function getAttchFileName(req,res,pdb,filedir){
    getAttchForFileId(req.params.attchmentid,res,pdb,filedir)
}


function expFile(res,filerealname,aid,filedir){
        console.log('real name='+filerealname);

        if(filerealname != ''){
          //console.log("mypath="+path.resolve('../public'));  
          var filepath = path.resolve(filedir)+filerealname;
          console.log("filepath="+filepath);
          fs.exists(filepath, function(exist) {
              if (!exist) {
                  res.send(aid+" is not found");
              } else {
                  fs.createReadStream(filepath).pipe(res);
              }
          });
        }else{
          res.send(aid+" is not found in db");
        }
}

module.exports.getAttchFileName = getAttchFileName;
module.exports.getFileForfileType = getFileForfileType;