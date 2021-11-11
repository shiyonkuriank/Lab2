const express = require('express');
const kafka = require('../kafka/client');
const {checkAuth}=require('../Utils/passport')


const router = express.Router();

router.post('/',checkAuth, (req, res)=>{
      kafka.make_request('viewFav', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let favs=[];
        for(let i=0;i<data.data.length;i++){
            let favDetails={
            
            RestName:data.data[i].RestName,
            Location:data.data[i].Location,

                           } 
                           favs.push(favDetails);           
                }
               
                        
    
      res.status(200).json({ favs});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch rest details");
        
      }
    });
  });

  module.exports = router;