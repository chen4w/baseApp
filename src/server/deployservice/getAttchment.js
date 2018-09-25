

var fs = require('fs');
var path = require('path');

function getAttchFileName(req,res,pdb,filedir){
    pdb.query.files({
        where:{
          id:req.params.attchmentid
        }
      }
    ).then((data) => {
        var  filerealname = '';
        if(data != null & data.length == 1 ){
            filerealname = data[0].url;
        }
        expFile(res,filerealname,req.params.attchmentid,filedir);
      });
}


function expFile(res,filerealname,aid,filedir){
        //console.log('real name='+filerealname);

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