const express = require("express");
const multer = require("multer");
const { checkAuth } = require("../Utils/passport");
const kafka = require('../kafka/client');
const awsImageUpload = require('../Utils/awsImageUpload');
const upload = multer({dest: 'uploads/'});


const router = express.Router();
router.post("/", upload.single('image'), async (req, res) => {
    
    console.log(req.body.img.name);
    const msg = req.body;
    if (req.file) {
      try {
        console.log('inside single file upload');
        imageUrl = await awsImageUpload.uploadFileToS3(req.file);
        console.log(imageUrl.Location);
        res.end();
      } catch (error) {
        console.log(error);
      }
    }
  });

  module.exports = router;