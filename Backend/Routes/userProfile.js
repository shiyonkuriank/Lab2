const express = require('express');
const {checkAuth}=require('../Utils/passport');
const {auth}=require('../Utils/passport');
const kafka = require('../kafka/client');
auth();

const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
  console.log("Inside userProfile route: "+req.body._id);
      kafka.make_request('userProfile', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        const payload = {
            
            UserName: data.data.UserName,
            Email: data.data.Email,
            Phone:data.data.Phone,
            DOB:data.data.DOB,
            City:data.data.City,
            State:data.data.State,
            Country:data.data.Country,
          };
              
    
      res.status(200).json({ payload});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;