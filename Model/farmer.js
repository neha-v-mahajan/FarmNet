const mongoose = require('mongoose');

var FarmerSchema = mongoose.Schema({

    fname:{
        type: String,
        // required: true
    },
    mname:{
        type: String,
        // required: true
    },
    lname:{
        type: String,
        // required: true
    },
    gender:{
    	type: String,
    	// required: true
    },
    nationality:
    {
        type:String,
        // required:true
    },
    mobno:
    {
        type:Number,
        // required:true
    },
    occupation:
    {
        type:String,
        // required:true
    },
    email:{
        type: String,
        // required: true
    },
    dob:{
    	type: Date,
    	// required: true
    },
    Aadhar:
    {
        type:String
    },
    address:{
    	type: String,
    	// required: true
    },
    id:{type:String},
    password:{type:String},
    
    state:{type:String},
    pincode:{type:Number},
    surveyno:{
        type:Number,required:true
    },
    cropname:{
        type:String,required:true
    },
    cropyield:
    {
        type:Number,required:true
    },
    season:{type:String,required:true},
    income:{type:String},
    area:{type:String},
    district:{type:String}
    
});

module.exports = mongoose.model('farmers', FarmerSchema);