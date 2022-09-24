const mongoose = require('mongoose')

const members = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:[4,'Name needs to have at least 3 characters'],
        maxlength:[20,'Name cannot be more than 20 characters'],
        trim:true
    },
    dob:{
        type:Date,
        // required:[true,'Please provide day of birth']
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        minlength:[3,'Email needs to have at least 3 characters'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:8
        // select:false
    }
})
const Members = mongoose.model('Members',members)
module.exports = Members