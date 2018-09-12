const protobuf = require("protobufjs")
const fs = require('fs')
const {saveBlock} = require('./sync')

describe('App同步区块链数据验证', () => {
    var Block,blk=null;
    beforeAll(function(done) {
       protobuf.load("gdb/protos/peer.proto", function(err, root) {
        if (err){
            throw err;
        }
        Block = root.lookupType("rep.protos.Block");
        fs.readFile('gdb/protos/99_be86fb02-e5fa-4c16-acf5-308eeb7ce862', (err, data) => {
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