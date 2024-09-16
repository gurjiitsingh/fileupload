const express = require("express");
const listRoute = express.Router();


const { fetchFileList, insertFileRecord, deletFileRecord } = require("../controllers/files.controllers.js");
listRoute.post('/',insertFileRecord)
listRoute.route('/').get(fetchFileList,(req, res, next)=>{console.log("in middle"); next()})
listRoute.route('/:id').delete(deletFileRecord)




const { ListHtmlFormat } = require("../controllers/files.controllershtml.js");
listRoute.route('/html').get(ListHtmlFormat)

module.exports = {
    listRoute,

}