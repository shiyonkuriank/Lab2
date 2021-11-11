const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var dishSchema= new Schema({
    
    Rest_id: {type: String, required: true},
    Dish: {type: String, required: true},
    Price: {type: Number, required: true},
    Category: {type: String, required: true},
    Ingredient: {type: String, required: true},
    Type:{type: String, required: true},
    Pic:{type: String,default: null},
    

},
{
versionKey:false
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;