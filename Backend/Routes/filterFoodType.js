const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../Kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{

    
      kafka.make_request('filterFood', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let filterFood=[];
        for(let i=0;i<data.data.length;i++){
            let restDetails={
            _id: data.data[i]._id,
            Name:data.data[i].Name,
            Location:data.data[i].Location,
            DeliveryType:data.data[i].DeliveryType,
            FoodType:data.data[i].FoodType,
            Time:data.data[i].Time
                    } 
                    filterFood.push(restDetails);           
                }
                console.log("Location search result: "+ JSON.stringify(filterFood));
              
          res.status(200).json({ filterFood});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("No Results Found");
        
      }
    });
  });

  module.exports = router;