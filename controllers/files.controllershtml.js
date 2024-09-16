const sql = require('better-sqlite3');

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




function insertFileRecordLocal(url,title){
    console.log("inside insertFileRecordLocal")
console.log("test")
const insertData = db.prepare("INSERT INTO files (slug, title) VALUES (?, ?)")
insertData.run(url,title)
//res.json({"fileList":"KJKJK"});
}


function fetchFileList(req, res){
const query = "SELECT * FROM files"
const fileList = db.prepare(query).all()
// db.close();
console.log(fileList)
res.json(fileList);
}


function ListHtmlFormat(req, res){


const query = "SELECT * FROM files"
const fileList = db.prepare(query).all()
// db.close();
console.log(fileList)

// const data = fileList.map((item)=>{
//     return <h3>{item.id}</h3>
// })
const data1 = "this is larg text"
var data="<table>";
for(i=0; i<fileList.length; i++){
    data += `<tr><td>${fileList[i].id}</td><td>${fileList[i].slug}</td><td>${fileList[i].title}</td></tr>`
}

data +="</table>";

res.send(data);


}


module.exports ={
  
    fetchFileList,
    insertFileRecordLocal,
    ListHtmlFormat,
}