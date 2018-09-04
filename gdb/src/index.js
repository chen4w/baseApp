const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const protobuf = require("protobufjs");
const {EventTube} = require('rclink')

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: false } }, info)
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id } }, info)
    },
    Block(parent, { id }, ctx, info) {
      return ctx.db.query.block({ where: { id } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            text,
          },
        },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info)
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
  },
}

const pdb = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
});
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: pdb,
  }),
})

async function saveBlock(blk) {
  var blk_data = {
    hash: Buffer.from(blk.stateHash).toString('base64'),
    transCount: blk.transactions.length
  };
  if(blk.previousBlockHash)
    blk_data.preHash = Buffer.from(blk.previousBlockHash).toString('base64');

  //写入区块
  var obj_blk =await pdb.mutation.createBlock(
    {
      data: blk_data,
    }
  )
  var txs = blk.transactions;
  //写入包含的交易
  for(var i=0; i<txs.length; i++){
    var tx = txs[i];
    var tx_data ={
      txId: tx.txid,
      blockId: blk_data.hash,
      type: tx.type,
      cname: tx.payload.chaincodeID.name,
      action: tx.payload.ctorMsg.function,
      ipt:tx.payload.ctorMsg.args.toString(),
      blocker :{connect:{id:obj_blk.id}}
    }
    pdb.mutation.createTransaction(
      {
        data: tx_data,
      }
    )  
    console.log(tx_data)
  }
 console.log(blk_data)  
}

function startEvents() {
  var Message,Block;
  protobuf.load("protos/peer.proto").then(function(root) {
    Message = root.lookupType("rep.protos.Event");
    Block = root.lookupType("rep.protos.Block");
    var et = new EventTube('ws://localhost:8081/event',function(evt){
      var ed = new Uint8Array(evt.data);
      var msg = Message.decode(ed);
      //出块通知 TODO 确保块内全部交易写入
      if (msg.action == 2 && msg.from != 'Block') {
        var blk =  msg.blk;
        saveBlock(blk)
      }
      //TODO 调用pdb to mutation createBlock
    })            
  });
}  
startEvents();      

//TODO 通过rclink restAPI主动请求高度，请求本地缺失block,调用pdb to mutation createBlock
//TODO 前端react admin 通过graphql检索、分页、排序数据
//TODO 前端react admin 订阅graphql,主动刷新
server.start(() => console.log('Server is running on http://localhost:4000'))
