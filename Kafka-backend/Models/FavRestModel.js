const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var favSchema= new Schema({
    RestName: {type: String, required: true},
    UserId: {type: String, required: true},
    Location: {type: String, required: true},
},
{
versionKey:false
});

const favModel = mongoose.model('fav', favSchema);
module.exports = favModel;