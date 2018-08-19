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

function startEvents() {
  var Message,Block;
  protobuf.load("protos/peer.proto").then(function(root) {
    Message = root.lookupType("rep.protos.Event");
    Block = root.lookupType("rep.protos.Block");
    var et = new EventTube('ws://localhost:8081/event',function(evt){
      //console.log(m);
      var ed = new Uint8Array(evt.data);
      var msg = Message.decode(ed);
      console.log(msg)
    })            
  });
}  
startEvents();      


server.start(() => console.log('Server is running on http://localhost:4000'))
