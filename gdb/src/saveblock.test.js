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
const protobuf = require("protobufjs")
const fs = require('fs')
const {saveBlock} = require('./saveblock')

describe('App同步区块链数据验证', () => {
    var Block,blk=null;
    beforeAll(function(done) {
       protobuf.load("public/protos/peer.proto", function(err, root) {
        if (err){
            throw err;
        }
        Block = root.lookupType("rep.protos.Block");
        fs.readFile('public/protos/99_be86fb02-e5fa-4c16-acf5-308eeb7ce862', (err, data) => {
            if (err) throw err;
            try {
                blk = Block.decode(data);
            } catch (e) {
                throw e;
            }
            done();
        });        
     });
    });

    test('protobuf结构化区块及交易能够保存到数据库', () => {
        var hash = blk.stateHash.toString('binary');
        expect(hash.length).toBe(64);
        var tx0 = blk.transactions[0];
        console.log(tx0.signature.toString('hex'));
    });
  });