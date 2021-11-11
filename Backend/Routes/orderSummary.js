const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../kafka/client');


const router = express.Router();


router.post('/',checkAuth,(req, res)=>{
      
    kafka.make_request('orderSummary',req.body, function(err,data){
            
      if (err){
        
          console.log("Inside userRegiter err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else if(data.status===200){
          console.log("Inside else");
          console.log('successfully registered');
          
          res.status(200).json({ data });
             
          }else {
            console.log('Invalid data');
            
            res.end('Invalid data');
          }
      
  });
  
  });
  module.exports = router;