var connection =  new require('./kafka/Connection');
const {mongoDB}=require('./config');
const mongoose=require('mongoose');

var options={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  poolSize: 500,
  bufferMaxEntries: 0,

};

mongoose.connect(mongoDB,options,(err,res)=>{
  if(err){
    console.log(err);
    console.log('Connection failed');
  }else{
    console.log('MongoDB Connected');
  }
})

 
//topics files
//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var Users=require('./services/userRegister');
var Rest=require('./services/restResgister');
var userLogin=require('./services/userLogin');
var restLogin=require('./services/restLogin');
var restProfile=require("./services/restProfile");
var userProfile=require("./services/userProfile");
var editUserEmail=require('./services/editUserEmail');
var editUserName=require('./services/editUserName');
var restsNearMe=require('./services/restNearMe');
var searchLocation=require('./services/searchLocation');
var filterFood=require('./services/filterFoodType');
var filterDType=require('./services/filterDType');
var addDish=require('./services/addDish');
const fav=require('./services/fav');
const viewDishes=require('./services/viewDishes');
const orderSummary=require('./services/orderSummary');
const viewUserOrder=require('./services/viewUserOrder');
const userOrderFilter=require('./services/userOrderFilter');
const receipt=require('./services/receipt');
const cancelOrder=require('./services/cancelOrder');
const viewFav=require('./services/viewFav');
const menu=require('./services/menu');
const viewRestOrder=require('./services/viewRestOrder');

const filterRestOrder=require('./services/filterRestOrder');
const dishSerach=require('./services/dishSearch');
const setOrderStatus=require('./services/setOrderStatus');
const editDishName=require('./services/editDishName');
const editDishCat=require('./services/editDishCat');
const editDishIng=require('./services/editDishIng');
const editDishPrice=require('./services/editDishPrice');
const editRestName=require('./services/editRestName');
const editRestEmail=require('./services/editRestEmail');
const editRestPhone=require('./services/editRestPhone');
const editRestLocation=require('./services/editRestLoc');
const editRestDesc=require('./services/editRestDesc');
const editRestTime=require('./services/editRestTime');
const restImg=require('./services/restImg');
const editUserPhone=require('./services/editUserPhone');
const editUserDOB=require('./services/editUserDOB');
const editUserCity=require('./services/editUserCity');
const editUserState=require('./services/editUserState');
const editUserCountry=require('./services/editUserCountry');
const userImg=require('./services/userImg');
const dishImg=require('./services/dishImg');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("post_user",Users)
handleTopicRequest("post_rest",Rest)
handleTopicRequest("userlogin",userLogin)
handleTopicRequest("restlogin",restLogin)
handleTopicRequest("restProfile",restProfile)
handleTopicRequest("userProfile",userProfile)
handleTopicRequest("editUser",editUserEmail);
handleTopicRequest("editUserName",editUserName);
handleTopicRequest("viewRests",restsNearMe);
handleTopicRequest("searchLocation",searchLocation);
handleTopicRequest("filterFood",filterFood);
handleTopicRequest("filterDType",filterDType);
handleTopicRequest("addDish",addDish);
handleTopicRequest("fav",fav);
handleTopicRequest("viewDishes",viewDishes);
handleTopicRequest("orderSummary",orderSummary);
handleTopicRequest("viewUserOrder",viewUserOrder);
handleTopicRequest("userOrderFilter",userOrderFilter);
handleTopicRequest("receipt",receipt);
handleTopicRequest("cancelOrder",cancelOrder);
handleTopicRequest("viewFav",viewFav);
handleTopicRequest("menu",menu);
handleTopicRequest("viewRestOrder",viewRestOrder);
handleTopicRequest("filterRestOrder",filterRestOrder);
handleTopicRequest("dishSerach",dishSerach);
handleTopicRequest("setOrderStatus",setOrderStatus);
handleTopicRequest("editDishName",editDishName);
handleTopicRequest("editDishCat",editDishCat);
handleTopicRequest("editDishIng",editDishIng);
handleTopicRequest("editDishPrice",editDishPrice);
handleTopicRequest("editRestName",editRestName);
handleTopicRequest("editRestEmail",editRestEmail);
handleTopicRequest("editRestPhone",editRestPhone);
handleTopicRequest("editRestLocation",editRestLocation);
handleTopicRequest("editRestDesc",editRestDesc);
handleTopicRequest("editRestTime",editRestTime);
handleTopicRequest("restImg",restImg);
handleTopicRequest("editUserPhone",editUserPhone);
handleTopicRequest("editUserDOB",editUserDOB);
handleTopicRequest("editUserCity",editUserCity);
handleTopicRequest("editUserState",editUserState);
handleTopicRequest("editUserCountry",editUserCountry);
handleTopicRequest("userImg",userImg);
handleTopicRequest("dishImg",dishImg);