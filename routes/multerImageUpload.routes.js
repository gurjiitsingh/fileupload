const express = require("express");
//import path from "path";
const multer = require("multer");
//import dotenv from "dotenv";
//import { fileURLToPath } from "url";

//dotenv.config();

//const multerImageRouter = Router();
const multerImageRouter = express.Router();

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory
// const filePath = path.join(__dirname, "files");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    // Define the file name for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const { fetchFileList, insertFileRecord, insertFileRecordLocal } = require("../controllers/files.controllers.js");
const upload = multer({ storage });

//multerImageRouter.post("/upload", upload.single("image"), imagePost)
multerImageRouter.route("/").post(upload.single("image"), (req, res) => {
  const fileData = req.file;
  const { destination,filename } = fileData
                                                            //const filePath = process.env.LOCAL_URL+process.env.PORT+"/"+destination+"/"+filename
                                                            //const filePath = "http://pdf.gstadeveloper.com/"+destination+"/"+filename
 const filePath = "http://pdf.gstadeveloper.com/files/"+filename
 insertFileRecordLocal(filePath,filename)            // saving record to database
 res.send({ "fileData": fileData, "fileUrl":filePath  });// sending url to api call
 
}
)



module.exports = {
  multerImageRouter,
};
