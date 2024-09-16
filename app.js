const express = require('express')
const  multer = require('multer');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')
//const fileURLToPath = require('url');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
//app.use('/link',express.static('../public'))
app.use('/link',express.static('./public/files'))
//app.use(express.static('public/files'))
app.use(express.static('public'))









app.use('/link1',express.static('../public/files'))




const { multerImageRouter } = require("./routes/multerImageUpload.routes");
//import multerImageRouter  from './routes/multerImageUpload.routes.js'
app.use('/uploads', express.static('./uploads')) // file path
app.use('/upload', multerImageRouter)



// list all files
const { listRoute } = require('./routes/list.routes.js')
app.use('/files',listRoute)




// app.get('/list',(req,res)=>{
//   res.send("this is list")
// })

 app.get('/',(req, res)=>{
      res.send("App is working")
  })


// template engine for html view
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'views'))
app.get('/view',(req,res)=>{
  res.render('index',{
    captions : "<h1>this is a caption</h1>"
  })
})

module.exports = {
  app,
};