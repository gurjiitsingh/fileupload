const sql = require('better-sqlite3');
const fs = require('fs')
const path = require('path')

const db = sql('filestore.db')


db.prepare(`
    CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    title TEXT
    )
    `).run();

// const data = [{
//     slug:"http/tex/jk",
//     title: "this is his file"
// }]


function insertFileRecord(req,res){
   // console.log(req.body.slug, req.body.title)
console.log("inside insertFileRecord")
const insertData = db.prepare("INSERT INTO files (slug, title) VALUES (?, ?)")
insertData.run(req.body.slug,req.body.title)
res.json({"fileList":"KJKJK"});
}

function insertFileRecordLocal(url,title){

const insertData = db.prepare("INSERT INTO files (slug, title) VALUES (?, ?)")
insertData.run(url,title)
//res.json({"fileList":"KJKJK"});
}


function deletFileRecord(req, res){
    const id = req.params.id;

    const result = db.prepare(`SELECT title FROM files WHERE id=${id}`).all()
   

    console.log("inside delete---------",result[0].title)

//delete file from the folder
    fs.unlink(path.join(__dirname,'..','public/files',result[0].title),(err)=>{
        if(err)console.log(err)
      
          console.log("File deleted successfully")
      })

 // deleting file record   
const insertData = db.prepare(`DELETE FROM files WHERE id=${id}`)
let deleteId = insertData.run()
res.send("deleteId")
}


function fetchFileList(req, res){
const query = "SELECT * FROM files"
const fileList = db.prepare(query).all()
// db.close();
console.log(fileList)
res.json(fileList);
}


function ListHtmlFormat(req, res){
res.send('<h1>This is html</h1>')
}


module.exports ={
    insertFileRecord,
    fetchFileList,
    insertFileRecordLocal,
    deletFileRecord,
    ListHtmlFormat,
}