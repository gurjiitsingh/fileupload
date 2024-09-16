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

function insertFileRecord(){
   // console.log(req)
const insertData = db.prepare("INSERT INTO files (slug, title) VALUES (?, ?)")
insertData.run("http:/localhost1","ms ram singh1")

}


function fetchFileList(){
const query = "SELECT * FROM files"
const fileList = db.prepare(query).all()
db.close();
console.log(fileList)
}

module.exports ={
    insertFileRecord,
    fetchFileList,
}