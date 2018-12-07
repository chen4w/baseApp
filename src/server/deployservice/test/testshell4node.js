
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