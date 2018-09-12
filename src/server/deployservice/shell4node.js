
    class Shell{
        
        shellCmd(cmd,callbackfunc){
            var exec = require('child_process').exec;
            exec(cmd, function (err, stdout, stderr) {
                callbackfunc(err, stdout, stderr);
            });
        }

        shellFile(filename,callbackfunc){
            var exec = require('child_process').execFile;
            exec(filename,{encoding:'utf8'},function (err,stdout,stderr){
                callbackfunc(err, stdout, stderr);
            });
        }
    }

    exports.Shell = Shell;