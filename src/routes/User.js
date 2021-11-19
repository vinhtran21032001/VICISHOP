const router =require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndIsAdmin} = require('./verifyToken');
const { findById } = require('../models/User');


// PUT : 
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new:true })
        return res.status(200).json(updateUser);
    } catch(err) {
        return res.status(500).json(err)
    }

})

// DELETE
router.delete("/:id", verifyTokenAndIsAdmin, async(req, res)=>{
    try{
        await User.findOneAndDelete(req.params.id);
        return res.status(200).json("User has been deleted....")
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET A USER 
router.get('/find/:id', verifyTokenAndAuthorization, async(req,res)=> {
    try {
       
        const user =await User.findById(req.params.id)
        const {password, ...orther} = user._doc
        res.status(201).json(orther);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET ALL USER 

router.get('/', verifyTokenAndIsAdmin, async(req,res)=> {
    try {
        const query = req.query.new;
        const user = query ? await User.find().limit(10) : await User.find()
        res.status(201).json(user);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET ALL STATS
router.get('/stats', verifyTokenAndIsAdmin, async (req,res)=> {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try {
        const data  = await User.aggregate([
            {$match : {createdAt : {$gte: lastYear}}},
            {
                $project : {
                    month : { $month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total : {$sum : 1},
                }
            }

        ])
        return res.status(200).json(data)
    } 
    catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router;