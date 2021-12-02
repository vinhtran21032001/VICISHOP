const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {type: String, required:true, unique:true},
    password : {type: String, required:true},
    name : {type: String, },
    lastname : {type: String, required:true},
    isAdmin : {type:Boolean, default:false},
    email : {type:String, required:true},
    phone : {type:String },
    address : {type:String },
    img : {type:String},
    gender: {type:String}
},
    {timestamps: true}
)

module.exports = mongoose.model("user", UserSchema);