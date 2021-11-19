const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndIsAdmin } = require('./verifyToken');



// Create PRODUCT
router.post('/', verifyToken, async (req, res)=> {
    const userId = req.user.id;
    const newOrder = Order({
        ...req.body,
    })
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(err) {
        res.status(500).json(err)
    }
})

// PUT : Order
router.put("/:id", verifyToken, async (req, res)=>{
    const newOrder = {userID: req.user.id, ...req.body};
    try{
        const updateOrder = await Order.findOneAndUpdate({id: req.params.id, userID : req.user.id}, 
        {
            $set: newOrder
        }, 
        { new:true })
        return res.status(200).json(updateOrder);
    } catch(err) {
        console.log
        return res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyToken, async(req, res)=>{
    try{
        await Order.findOneAndDelete({id: req.params.id, userID : req.user.id});
        return res.status(200).json("Order has been deleted....")
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET A Cart 
router.get('/find/:id', verifyToken, async(req,res)=> {
    try {
        const findOrder = await Order.findOne({id: req.params.id, userID : req.user.id})
        res.status(201).json(findOrder);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET ALL PRODUCT 

router.get('/', verifyTokenAndIsAdmin, async(req,res)=> {
    try { 
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET STATS
router.get('/stats', verifyTokenAndIsAdmin, async (req,res)=> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() -1));
    try {
        const data  = await Order.aggregate([
            {$match : {createdAt : {$gte: lastMonth}}},
            {
                $project : {
                    month : { $month: "$createdAt"} ,
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total : {$sum : "$sales"},
                    
                }
            }

        ])
        return res.status(200).json(data)
    } 
    catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
module.exports = router;