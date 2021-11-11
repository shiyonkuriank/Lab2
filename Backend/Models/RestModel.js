const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var restSchema= new Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Pwd: {type: String, required: true},
    Phone: {type: String, required: true},
    Location: {type: String, required: true}
    

},
{
versionKey:false
});

const restModel = mongoose.model('rest', restSchema);
module.exports = restModel;