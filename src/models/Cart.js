const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userID : { type: String , required: true },
   products : [
      {
          ProductId: {type:String},
          title: {type:String},
          amount : {type:String},
          size : {type:String},
          color : {type:String},
          price : {type:String},
          img : {type:String},
      }
   ],
   quantity : {type: Number , default : 0},
   totalPrice : {type:Number, default : 0}
},
    {timestamps: true}
)

module.exports = mongoose.model("cart", CartSchema);