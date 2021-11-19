const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndIsAdmin} = require('./verifyToken');




// Create PRODUCT
router.post('/', verifyTokenAndIsAdmin, async (req, res)=> {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        res.status(500).json(err)
    }
})

// PUT : Product
router.put("/:id", verifyTokenAndIsAdmin, async (req, res)=>{
    console.log(req.params.id)
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new:true })
        return res.status(200).json(updateProduct);
    } catch(err) {
        return res.status(500).json(err)
    }

})

// DELETE
router.delete("/:id", verifyTokenAndIsAdmin, async(req, res)=>{
    try{
        await Product.findOneAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted....")
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET A Product 
router.get('/find/:id', async(req,res)=> {
    try {
        const findProduct = await Product.findById(req.params.id)
        res.status(201).json(findProduct);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 

// GET ALL PRODUCT 

router.get('/', async(req,res)=> {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let product;
        if(qNew) {
            product = await Product.find().sort({createdAt: -1}).limit(1);
        } 
        else if(qCategory) {
            product = await Product.find({
                category : {
                    $in: [qCategory]
                }
            });
        } else {
            product = await Product.find();
        }
        res.status(200).json(product);
    }
    catch(err) {
        return res.status(500).json(err)
    }
}) 




module.exports = router;