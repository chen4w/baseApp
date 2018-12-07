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
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const {syncher} = require('./sync')
const cfg = require('config');

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
  endpoint: cfg.get('Prisma.endpoint'), // the endpoint of the Prisma API
  debug: false, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
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
});

//startSyncPush(cfg.get('RepChain.default.url_subscribe'),prisma);
//startSyncPull(cfg.get('RepChain.default.url_api'),prisma,100);

var sync = new syncher(prisma,cfg.get('RepChain.default.url_api'),
                      cfg.get('RepChain.default.url_subscribe'));

function startSynch(){
    sync.StartPullBlocks();
}

setTimeout(() => {
  sync.StartPullBlocks();
}, 2000);

setTimeout(() => {
  sync.startSyncPush();
}, 10000);
//TODO 通过rclink restAPI主动请求高度，请求本地缺失block,调用pdb to mutation createBlock
//TODO 前端react admin 通过graphql检索、分页、排序数据
//TODO 前端react admin 订阅graphql,主动刷新
server.start(() => console.log('Server is running on '+server.options.port))
