
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