const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema= new Schema({
    UserName: {type: String, required: true},
    NickName: {type: String, required: true},
    Email: {type: String, required: true},
    Pwd: {type: String, required: true},
    Phone: {type: String, required: true},
    DOB: {type: String, required: true},
    City: {type: String, required: true},
    State: {type: String, required: true},
    Country: {type: String, required: true},
    Pic:{type: String,default: null},

},
{
versionKey:false
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;