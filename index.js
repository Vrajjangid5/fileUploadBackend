const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT||3000;

app.use(express.json());

const fileupload= require("express-fileupload");
app.use(fileupload());

const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudaniry");
cloudinary.cloudinaryConnect();

const upload = require("./routes/FileUpload");
app.use("/api/v1/upload",upload);

app.listen(3000,()=>{
    console.log(`app is running on ${PORT}`);
})