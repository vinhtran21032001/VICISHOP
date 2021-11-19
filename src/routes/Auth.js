const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


// POST : registort
router.post("/resgistor", async (req, res,next)=>{
    const newUser = new User({
        username : req.body.username,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY),
        name : req.body.name,
        lastname : req.body.lastname,
        email : req.body.email,
    })
   try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
   } catch(err){
    res.status(500).json(err)
   }
})


// POST : login
router.post("/login", async (req,res,next)=>{
  try{
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(401).json("Wrong credentials"); 

    const hasdedPassword = CryptoJS.AES.decrypt(user && user.password, process.env.PASS_KEY);
    const originalPassword = hasdedPassword.toString(CryptoJS.enc.Utf8);
    
    if(req.body.password !== originalPassword) return res.status(401).json("Wrong credentials pass");

    const token = jwt.sign(
        {
        id : user._id,
        isAdmin : user.isAdmin,
        }, 
        process.env.JWT_KEY,
        {expiresIn:"3d"},
    );
    const {password, ...orther} = user._doc
    res.status(201).json({...orther, token})

  } catch(err) {
      res.status(500).json(err)
  }
})


module.exports = router