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
const express = require('express');
const { Prisma } = require('prisma-binding')
const cfg = require('config');
path = require('path');

const ourConfigDir = path.join('../gdb', 'config');
const bConfig = cfg.util.loadFileConfigs(ourConfigDir);
cfg.util.setModuleDefaults('bar', bConfig);

const filedir = cfg.get('bar.NodeService.UploadBaseFileDir');//'../public'
const multer = require('multer');
const {getAttchFileName,getFileForfileType} = require('../src/server/deployservice/getAttchment.js')
const {StartOrStopService,NodeStatusChangeHandler} = require('../src/server/deployservice/startOrStopNode.js')
const upload = multer({
  dest: filedir+cfg.get('bar.NodeService.UploadMiddleFileDir') // this saves your file into a directory called "uploads"
}); 


const pdb = new Prisma({
    typeDefs: '../gdb/src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
    endpoint: cfg.get('bar.Prisma.endpoint'),//'http://localhost:4466', // the endpoint of the Prisma API
    debug: true, // log all GraphQL queries & mutations sent to the Prisma API
    // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
  });
  
  
  
const app = express();
const port = process.env.PORT || 5000;
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/upload', upload.single('file-to-upload'), (req, res) => {
    var file = req.file;
    res.send({ret_code: '0'});
    pdb.mutation.createFile(
        {
          data: {title:file.originalname,size:file.size,
            contentType:file.mimetype,url:cfg.get('bar.NodeService.UploadMiddleFileDir') +file.filename}
        }
      )    
  });
  
  app.get('/download/:attchmentid', function (req, res) {
    getAttchFileName(req, res, pdb,filedir);
  });

  app.get('/getFile/:filetype/:attchmentid', function (req, res) {
    getFileForfileType(req, res, pdb,filedir);
  });

  app.get('/startNode/:nodename/:actionname', function (req, res) {
    console.log('entry start node');
    StartOrStopService(req, res, pdb);
  });


app.listen(port, () => console.log(`Listening on port ${port}`));





const gql = require('graphql-tag');
// A subscription query to get changes for author with parametrised id 
// using $id as a query variable
const SUBSCRIBE_QUERY = gql`
subscription{
  netPeer(
    where: { mutation_in: [UPDATED] 
      
          }   
  ){
    mutation
    node{
      id
      seedip
      nodename
      rtGraph
      status
    }
    updatedFields
    previousValues{
      status
    }
  }
}
`;

const { CustomSubscribe } = require('../gdb/src/subscribe.js');
CustomSubscribe(cfg.get('bar.Prisma.url_subscribe'), SUBSCRIBE_QUERY, function (eventData) {
  NodeStatusChangeHandler(pdb,eventData);
}, function (err) {
  console.log('err='+err);
});