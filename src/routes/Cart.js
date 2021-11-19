const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndIsAdmin } = require('./verifyToken');


// Create user PRODUCT
router.post('/', verifyToken, async (req, res)=> {
    const userId = req.user.id;
    try {
        const findCart = await Cart.findOne({userID : userId});
        if(findCart) {
            findCart.quantity +=1;
            findCart.totalPrice += req.body.totalPrice,
            findCart.products = [...findCart.products, req.body.product];
            await findCart.save();
            return res.status(200).json(findCart);
        } else {
            const userId = req.user.id
            const newCart = Cart({
              userID : userId,
              products: [
                  req.body.product
              ],
              quantity : 1,
              totalPrice : req.body.totalPrice
            });
            const savedCart = await newCart.save();
            return res.status(200).json(savedCart);
        }
    } catch(err){
        return res.status(500).json(err)
    }
})




// PUT : Cart
router.put("/:id", verifyToken, async (req, res)=>{
    const newCart = {userID: req.user.id, ...req.body}
    try{
        const updateCart = await Cart.findOneAndUpdate({id: req.params.id, userID : req.user.id}, 
        {
            $set: newCart
        }, 
        { new:true })
        return res.status(200).json(updateCart);
    } catch(err) {
        console.log
        return res.status(500).json(err)
    }
})

// DELETER ONE PRODUCT IN CART
router.delete('/product/:id', verifyToken, async(req, res)=> {
    try {
        const deleteCart = await Cart.findOne({userID : req.user.id});
        const productDelete = deleteCart.products.find(item=>item.id === req.params.id);
        deleteCart.products = deleteCart.products.filter(item=>item.id !== req.params.id) 
        deleteCart.quantity = deleteCart.quantity- 1;
        deleteCart.totalPrice =    deleteCart.totalPrice - productDelete.price*productDelete.amount;
        await deleteCart.save()
        return res.status(200).json("Delete Success")
    }
    catch(err) {
        return res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyToken, async(req, res)=>{
    try{
        await Cart.findOneAndDelete({id: req.params.id, userID : req.user.id});
        return res.status(200).json("Cart has been deleted....")
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET A Cart 
router.get('/find/:id', verifyToken, async(req,res)=> {
    try {
        const findCart = await Cart.findOne({id: req.params.id, userID : req.user.id})
        res.status(201).json(findCart);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 
router.get('/find', verifyToken, async(req,res)=> {
    try {
        const findCartByUser = await Cart.findOne({userID: req.user.id})
        res.status(200).json(findCartByUser);
    } catch (err) {
        return res.status(500).json(err)
    }
})

// GET ALL PRODUCT 

router.get('/', verifyTokenAndIsAdmin, async(req,res)=> {
    try { 
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

module.exports = router;