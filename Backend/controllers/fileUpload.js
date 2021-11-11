const AWS = require("aws-sdk");
const config = require("../Utils/config");
const Restaurants = require("../Models/RestModel")

AWS.config.update({
  secretAccessKey: config.awsSecretAccessKey,
  accessKeyId:config.awsAccessKey,
  region:config.awsRegion,

});

var s3 = new AWS.S3();

const handleFileUpload = (req,res) =>{
  console.log("req._id",req.body._id)
  console.log("req.file",req.file)
  const {originalname,buffer} = req.file;
  let params = {
    Bucket:config.awsBucket,
    Key:originalname,
    Body:buffer,
  }

s3.upload(params,async(err,result) =>{
  if(err){
    res.status(500).json({
      message:"Failed to upload",
      error:err.message,
    });
  }
    res.send({imagePath : `/image${result.Key}`})
});

};

module.exports = {
  handleFileUpload,
}