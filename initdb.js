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

const insertData = db.prepare("INSERT INTO files (slug, title) VALUES (?, ?)")
insertData.run("http:/localhost","ms ram singh")



const query = "SELECT * FROM files"
const fileList = db.prepare(query).all()
db.close();
console.log(fileList)
