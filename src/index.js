const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config({ path: path.resolve(__dirname, '\.env') })

const {paymentRouter,authRouter, userRouter, cartRouter, productRouter, orderRouter} = require('./routes/index');


// route
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use("/api/checkout",paymentRouter)
app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/product",productRouter);
app.use("/api/order", orderRouter)


mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("Connect to DB succesfully")})
.catch(err=>console.log(err))



app.listen(port,()=>{
    console.log("Connect Succesfully");
})