const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
      kafka.make_request('viewDishes', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let dishes=[];
        for(let i=0;i<data.data.length;i++){
            let dishDetails={
            
            Dish:data.data[i].Dish,
            Price:data.data[i].Price,
            Category:data.data[i].Category,
            Ingredient:data.data[i].Ingredient,
            Pic:data.data[i].Pic,
            Rest_id:data.data[i].Rest_id,
                           } 
                    dishes.push(dishDetails);           
                }
               
              
          res.status(200).json({dishes });
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;