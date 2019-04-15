const mongoose = require('mongoose');

var comments=mongoose.Schema({
    personname:{
        type:String,
    },
    message:{
        type:String
    }

});
var InnovationSchema = mongoose.Schema({

    owner:{
        type:String,
    },
    title:{
        type:String,
    },
    login_id:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
    },
    image:
    {
        type:String,
    },
    video:
    {
        type:String,
    },
    audio:
    {
        type:String,
    },
    des:
    {
        type:String,
        required:true,
    },
    comment:comments
});  
module.exports = mongoose.model('innovations', InnovationSchema);