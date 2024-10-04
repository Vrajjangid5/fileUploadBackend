const express = require("express");
const router = express.Router();
const { localFileUpload,imageUpload ,videoUpload} = require("../controllers/fileupload");

router.post("/localfileupload", localFileUpload);
router.post("/imageupload", imageUpload);
router.post("/videoupload",videoUpload);


module.exports = router;
