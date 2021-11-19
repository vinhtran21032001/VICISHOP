const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {type: String, required:true, unique:true},
    desc : {type: String, required:true},
    img : {type: String, required:true},
    price : {type: String, required:true },
    category : {type:Array},
    color : {type:Array,},
    size : {type:Array,},
},
    {timestamps: true}
)

module.exports = mongoose.model("product", ProductSchema);