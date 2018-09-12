
let {Shell} = require('../shell4node.js');
var shell = new Shell();
var cmdstr = "ls -all";
shell.shellCmd(cmdstr,function(err,stdout,stderr){
    if(err) {
        console.log(stderr);
    } else {
        console.log(stdout);
    }
});

var filename = process.cwd()+'/src/server/deployservice/test/testfile/test.sh';
console.log(filename);
shell.shellFile(filename,function(err,stdout,stderr){
    if(err) {
        console.log(stderr);
    } else {
        console.log(stdout);
    }
});