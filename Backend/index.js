const express=require("express");
const app=express();

const jwt = require('jsonwebtoken');
const { secret } = require('./Utils/config');
const { auth } = require("./Utils/passport");

var bodyParser=require('body-parser');
var session=require('express-session');
var cookieParser=require('cookie-parser');
const cors=require("cors");
const path=require('path');
//const bcrypt=require("bcrypt");
var ipAddress='localhost';
var kafka= require('./Kafka/client');

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));


app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: 'cmpe273_UberEats',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  }),
);

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,UPDATE');
  res.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,content-type");
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
const {mongoDB}=require('./Utils/config');
const mongoose=require('mongoose');

var options={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  maxPoolSize: 500,
  //bufferMaxEntries: 0,

};

mongoose.connect(mongoDB,options,(err,res)=>{
  if(err){
    console.log(err);
    console.log('Connection failed');
  }else{
    console.log('MongoDB Connected');
  }
})


app.listen(3001,()=>{
  console.log("Server running on 3001");
  });



const restRegister=require("./Routes/restResister");
app.use('/restregister', restRegister);
const restLogin=require("./Routes/restLogin");
app.use('/restlogin', restLogin);
const userLogin=require("./Routes/userLogin");
app.use('/userlogin', userLogin);
const userRegister=require("./Routes/userRegister");
app.use('/userregister', userRegister);
const profile=require("./Routes/restProfile");
app.use('/profile', profile);
const userprofile=require("./Routes/userProfile");
app.use('/userProfile', userprofile);
const editUserEmail=require('./Routes/editUserEmail');
app.use('/editUserEmail',editUserEmail);
const editUserName=require('./Routes/editUserName');
app.use('/editUserName',editUserName);
const editUserPhone=require('./Routes/editUserPhone');
//app.use('/editUserPhone',editUserPhone);
const editUserDOB=require('./Routes/editUserDOB');
//app.use('/editUserDob',editUserDOB);
const editUserCity=require('./Routes/editUserCity');
//app.use('/editUserCity',editUserCity);
const editUserState=require('./Routes/editUserState');
//app.use('/editUserState',editUserState);
const editUserCountry=require('./Routes/editUserCountry');
//app.use('/editUserCountry',editUserCountry);
const restNearMe=require("./Routes/restNearMe");
app.use('/restNearMe',restNearMe);
const searchLocation=require("./Routes/searchLocation");
app.use('/locSearch',searchLocation);
const filterFoodType=require("./Routes/filterFoodType");
app.use('/restFoodType',filterFoodType);
const filterDeliveryType=require("./Routes/filterDeliveryType");
app.use('/restDeliveryType',filterDeliveryType);
const addDish=require("./Routes/addDish");
app.use('/addDish',addDish);
const fav=require("./Routes/fav");
app.use('/favRest',fav);
const viewDishes=require('./Routes/viewDishes');
app.use('/dishes', viewDishes);
const orderSummary=require('./Routes/orderSummary');
app.use('/orderSummary',orderSummary);
const viewUserOrders=require('./Routes/viewUserOrders');
app.use('/viewRestOrder', viewUserOrders);
const userOrderFilter=require('./Routes/userOrderFilter');
app.use('/statusFilter',userOrderFilter);
const receipt=require('./Routes/receipt');
app.use('/viewReceipt',receipt);
const cancelOrder=require('./Routes/cancelOrder');
app.use('/cancelOrder',cancelOrder);
const viewFav=require('./Routes/viewFav');
app.use('/fav',viewFav);
const menu=require('./Routes/menu');
app.use('/dishes',menu);
const viewRestOrder=require('./Routes/viewRestOrder');
app.use('/viewCustOrder',viewRestOrder);
const filterRestOrder=require('./Routes/filterRestOrder');
app.use('/orderStatusFilter',filterRestOrder);
const dishSearch=require('./Routes/dishSearch');
app.use('/dishSearch',dishSearch);
const setStatus=require('./Routes/setOrderStatus');
app.use('/setOrderStatus',setStatus);
const editDishName=require("./Routes/editDishName");
app.use('/editDname',editDishName);
const editDishPrice=require('./Routes/editDishPrice');
app.use('/editPrice',editDishPrice);
const editDishCat=require('./Routes/editDishCat');
app.use('/editCat',editDishCat);
const editDishIng=require('./Routes/editDishIng');
app.use('/editIng',editDishIng);
const uploadUserImage=require('./Routes/uploadUserImage');
app.use('/editProfileImg',uploadUserImage);
const editRestName=require('./Routes/editRestName');
app.use('/editName',editRestName);
const uploadRestImage=require('./Routes/uploadRestImage');
app.use('/editRestImg',uploadRestImage);
const editRestEmail=require('./Routes/editRestEmail');
app.use('/editEmail',editRestEmail);
const editRestPhone=require('./Routes/editRestPhone');
app.use('/editPhone',editRestPhone);
const editRestLoc=require('./Routes/editRestLoc');
app.use('/editLoc',editRestLoc);
const editRestDesc=require('./Routes/editRestDesc');
app.use('/editDesc',editRestDesc);
const editRestTime=require('./Routes/editRestTime');
app.use('/editTime',editRestTime);



/*
app.post('/editOrderSummaryRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE OrderSummary SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});


app.post('/editDishesRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE Dishes SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});

app.post('/editFavRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE FavRest SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});

app.post('/editEmail',(req, res)=>{
  const name=req.body.name; 
  const newemail=req.body.newemail;
  
  connection.query("UPDATE Rest SET Email=? WHERE Restname=?", [newemail,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
       res.send(result); 
      }
    }
  );
});

app.post('/editPhone',(req, res)=>{
   const name=req.body.name; 
  const newphone=req.body.newPhone;
  
  connection.query("UPDATE Rest SET Phone=? WHERE Restname=?", [newphone,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});

app.post('/editLoc',(req, res)=>{
  
  const name=req.body.name; 
  const newloc=req.body.newLoc;
  
  connection.query("UPDATE Rest SET Loc=? WHERE Restname=?", [newloc,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editType',(req, res)=>{
  
  const name=req.body.name; 
  const type=req.body.type;
  
  connection.query("UPDATE Rest SET DeliveryType=? WHERE Restname=?", [type,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editDesc',(req, res)=>{
  
  const name=req.body.name; 
  const newdesc=req.body.newDesc;
  
  connection.query("UPDATE Rest SET Description=? WHERE Restname=?", [newdesc,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editTime',(req, res)=>{
 
  const name=req.body.name; 
  const newtime=req.body.newTime;
  
  connection.query("UPDATE Rest SET Time=? WHERE Restname=?", [newtime,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});


app.post('/editProfileImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  //const id=req.body.id;
  const img=req.body.img;
  
  
connection.query("update user set Img=? where Name=?", 
[img,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});


app.post('/editDishImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  const dish=req.body.dish;
  const img=req.body.img;
  
  
connection.query("update Dishes set Pic=? where Dishes=? and Restname=?", 
[img,dish,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});


app.post('/editRestImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  //const dish=req.body.dish;
  const img=req.body.img;
  
  
connection.query("update Rest set Img=? where Restname=?", 
[img,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});

app.post('/viewImg',(req, res)=>{
  console.log("viewimage");
  
  const id=req.body.id;
   
  
connection.query("SELECT Img from UserImg where User_id=?", 
[id],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      
      res.send(result); 
      }
    }
  );
});





app.post('/editOrderSummaryUserName',(req, res)=>{
  
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE OrderSummary SET Customer=? WHERE Customer=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editFavUserName',(req, res)=>{
  
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE FavRest SET Customer=? WHERE Customer=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});



app.post('/editUserPhone',(req, res)=>{
  
  const name=req.body.name; 
  const newphone=req.body.newphone;
  
  connection.query("UPDATE user SET Phone=? WHERE Name=?", [newphone,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});

app.post('/editUserDob',(req, res)=>{

  const name=req.body.name; 
  const newdob=req.body.newdob;
  
  connection.query("UPDATE user SET DOB=? WHERE Name=?", [newdob,name],
  (err, result)=>{
    if(err){
   
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserPass',(req, res)=>{

  const name=req.body.name; 
  const newpass=req.body.newpass;
  const hashedPass=bcrypt.hashSync(newpass,10);
  
  connection.query("UPDATE user SET Pwd=? WHERE Name=?", [hashedPass,name],
  (err, result)=>{
    if(err){
   
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserCity',(req, res)=>{
 
  const name=req.body.name; 
  const newcity=req.body.newcity;
  
  connection.query("UPDATE user SET City=? WHERE Name=?", [newcity,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});

app.post('/editUserState',(req, res)=>{
 
  const name=req.body.name; 
  const newstate=req.body.newstate;
  
  connection.query("UPDATE user SET State=? WHERE Name=?", [newstate,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserCountry',(req, res)=>{
 
  const name=req.body.name; 
  const newcountry=req.body.newcountry;
  
  connection.query("UPDATE user SET Country=? WHERE Name=?", [newcountry,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});


app.post('/editDname',(req, res)=>{
 
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE Dishes SET Dishes=? WHERE Dishes=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});


app.post('/editPrice',(req, res)=>{
 
  const name=req.body.name; 
  const newprice=req.body.newPrice;
  
  connection.query("UPDATE Dishes SET Price=? WHERE dishes=?", [newprice,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editCat',(req, res)=>{
 
  const name=req.body.name; 
  const newcat=req.body.newCat;
  
  connection.query("UPDATE Dishes SET Category=? WHERE dishes=?", [newcat,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});


app.post('/editIng',(req, res)=>{
 
  const name=req.body.name; 
  const newing=req.body.newIng;
  
  connection.query("UPDATE Dishes SET Ingredient=? WHERE Dishes=?", [newing,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});



app.post('/addDish',(req, res)=>{
  
  const rname=req.body.rname; 
  const name=req.body.name;
  const price=req.body.price; 
  const type=req.body.type; 
  const cat=req.body.cat;
  const ing=req.body.ing;
  const pic=req.body.pic;
  connection.query("INSERT INTO Dishes(Restname,Dishes,Price,Category,Ingredient,Pic,Type) VALUES(?,?,?,?,?,?,?)", 
  [rname,name,price,cat,ing,pic,type],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/dishes',(req, res)=>{
  
  const name=req.body.name; 
  
  
  connection.query("SELECT Dishes,Category,Price,Ingredient,Pic FROM Dishes WHERE Restname=?", [name],
  (err, result)=>{
    if(err){
      
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});


app.post('/dishSearch',(req, res)=>{
 
  const dish=req.body.dish; 
  
connection.query("SELECT Restname FROM Dishes WHERE Dishes=?", [dish],
  (err, result)=>{
    
    if(result.length>0){
      
       res.send(result); 
      }else{
        res.send({message: "No Restaurants found!"});
      }
    }
  );
});

app.post('/locSearch',(req, res)=>{
 
  const loc=req.body.loc; 
  
connection.query("SELECT * FROM Rest WHERE Loc=?", [loc],
  (err, result)=>{
    
    if(result.length>0){
      
       res.send(result); 
      }else{
        res.send({message: "No Restaurants found!"});
      }
    }
  );
});


app.post('/restFoodType',(req, res)=>{
  
  const type=req.body.foodType; 
  
connection.query("SELECT Restname, Loc, FoodType, Time, Img FROM Rest WHERE FoodType=?", [type],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      }
    }
  );
});

app.post('/restDeliveryType',(req, res)=>{
  console.log("delivery type called");
  const type=req.body.deliveryType; 
  
connection.query("SELECT Restname, Loc, DeliveryType,Time,Img  FROM Rest WHERE DeliveryType =?", [type],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      console.log("delivery type");
      res.send(result); 
      }
    }
  );
});



app.post('/orderSummary',(req, res)=>{
  console.log("add summary called");
  const restname=req.body.name; 
  const customer=req.body.customer;
  const dishes=req.body.dishes;
  
  
connection.query("INSERT INTO OrderSummary (Restname, Customer, Dishes) VALUES(?,?,?)", 
[restname,customer,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("order summary");
      res.send(result); 
      }
    }
  );
});

app.post('/addTotal',(req, res)=>{
  console.log("add total called");
  const total=req.body.tot; 
  const restname=req.body.name; 
  const customer=req.body.customer; 
  const address=req.body.address; 
  const dishes=req.body.dishes;
  const dtype=req.body.deliveryType;
  const status=req.body.status;
  
connection.query("update OrderSummary set Price=?, Address=?,DeliveyType=?,OrderStatus=? where Restname=? and Customer=? and Dishes=?", 
[total,address, dtype,status,restname,customer,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("order summary");
      res.send(result); 
      }
    }
  );
});



app.post('/setOrderStatus',(req, res)=>{
  console.log("status called");
  //const name=req.body.name;
  //const customer=req.body.customer;
  const dishes=req.body.dishes;
  const status=req.body.status;
  
connection.query("update OrderSummary set OrderStatus=? where Dishes=?", 
[status,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("status updated");
      res.send(result); 
      }
    }
  );
});



app.post('/favRest',(req, res)=>{
  console.log("fav called");
  const restname=req.body.name; 
  const loc=req.body.loc;
  const customer=req.body.customer;
  
connection.query("INSERT INTO FavRest (Restname, Loc, Customer) VALUES(?,?,?)", 
[restname,loc,customer],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("added to fav");
            }
    }
  );
});

app.post('/fav',(req, res)=>{
  console.log("fav rest called");
  const customer=req.body.name;
  
connection.query("SELECT * FROM FavRest WHERE Customer=?",[customer], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      console.log("fav displayed");
        }
    }
  );
});

app.post('/viewCustOrder',(req, res)=>{
 
  const name=req.body.name;
  
connection.query("SELECT * FROM OrderSummary WHERE Restname=?",[name], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});

app.post('/viewRestOrder',(req, res)=>{
 
  const name=req.body.name;
  
connection.query("SELECT Restname, Dishes FROM OrderSummary WHERE Customer=?",[name], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});


app.post('/statusFilter',(req, res)=>{
 
  const name=req.body.name;
  const status=req.body.status;
  
connection.query("SELECT Restname, Dishes FROM OrderSummary WHERE Customer=? and OrderStatus=?",[name,status], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
 
    }
  );
});

app.post('/orderStatusFilter',(req, res)=>{
 
  const name=req.body.name;
  const status=req.body.status;
  
connection.query("SELECT Customer, Dishes FROM OrderSummary WHERE Restname=? and OrderStatus=?",[name,status], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});

app.post('/viewReceipt',(req, res)=>{
 console.log("receipt called");
 

  const name=req.body.name;
  const restname=req.body.restname;
  const dish=req.body.dish;
  
connection.query("SELECT * FROM OrderSummary WHERE Restname=? and Customer=? and Dishes=?",[restname,name,dish], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      console.log("receipt returned");
      res.send(result); 
     
        }
    }
  );
});

*/
