const express = require('express');
const { Prisma } = require('prisma-binding')
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const pdb = new Prisma({
    typeDefs: '../gdb/src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
    endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
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
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.send({ret_code: '0'});
    pdb.mutation.createFile(
        {
          data: {title:file.originalname}
        }
      )    
  });
  
app.listen(port, () => console.log(`Listening on port ${port}`));