const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const {startSyncPush, startSyncPull} = require('./sync')

const fs = require('fs')
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const uploadDir = './uploads'
const db = new lowdb(new FileSync('db.json'))

// Seed an empty DB
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

const recordFile = file =>
  db.get('uploads')
    .push(file)
    .last()
    .write()

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })
}

const resolvers = {
  Query: {
    uploads: () => db.get('uploads').value(),
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
    singleUpload: (obj, { file }) => processUpload(file),
    multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload)),

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

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
});

const gql = require('graphql-tag');
// A subscription query to get changes for author with parametrised id 
// using $id as a query variable
const SUBSCRIBE_QUERY = gql`
subscription netPeer {
  netPeer {
    mutation
    node {
      id
      nodename
      seedip
      status
    }
  }
}
`;

const { subscribe } = require('./subscribe');
subscribe('ws://localhost:4466/', SUBSCRIBE_QUERY, function (eventData) {
  console.log(JSON.stringify(eventData, null, 2));
}, function (err) {
  console.log(err);
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: prisma,
  }),
})



//startSyncPush('ws://localhost:8081/event',prisma);
startSyncPull('http://localhost:8081/',prisma,5000);

//TODO 通过rclink restAPI主动请求高度，请求本地缺失block,调用pdb to mutation createBlock
//TODO 前端react admin 通过graphql检索、分页、排序数据
//TODO 前端react admin 订阅graphql,主动刷新
server.start(() => console.log('Server is running on http://localhost:4000'))
