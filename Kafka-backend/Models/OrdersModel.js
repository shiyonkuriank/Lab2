const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var orderSchema= new Schema({
    RestName: {type: String, required: true},
    UserName: {type: String, required: true},
    UserId: {type: String, required: true},
    RestId: {type: String, required: true},
    Dishes: {type: String, required: true},
    Price: {type: String, required: true},
    Address: {type: String, required: true},
    DeliveryType:{type: String, required: true},
    OrderStatus: {type: String, required: true},
    SpecialInstruction: {type: String, required: true},
    Date: {type: String, required: true},
    Time: {type: String, required: true},
},
{
versionKey:false
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;