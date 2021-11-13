const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
    console.log("Route rest near me: "+req.body.city)
      kafka.make_request('viewRests', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let restNear=[];
        for(let i=0;i<data.data.length;i++){
            let restNearDetails={
            _id: data.data[i]._id,
            Name:data.data[i].Name,
            Location:data.data[i].Location,
            DeliveryType:data.data[i].DeliveryType,
            FoodType:data.data[i].FoodType,
            Time:data.data[i].Time,
            Pic:data.data[i].Pic,

                    } 
                    restNear.push(restNearDetails);           
                }
                
              
          res.status(200).json({ restNear});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;