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
app.use('/editUserPhone',editUserPhone);
const editUserDOB=require('./Routes/editUserDOB');
app.use('/editUserDob',editUserDOB);
const editUserCity=require('./Routes/editUserCity');
app.use('/editUserCity',editUserCity);
const editUserState=require('./Routes/editUserState');
app.use('/editUserState',editUserState);
const editUserCountry=require('./Routes/editUserCountry');
app.use('/editUserCountry',editUserCountry);
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
const restPic=require('./Routes/restPic');
app.use('/restPic',restPic);
const userPic=require('./Routes/userPic');
app.use('/userPic',userPic);
const dishPic=require('./Routes/dishPic');
app.use('/dishPic',dishPic);



