const userRouter = require('./User');
const authRouter = require('./Auth');
const orderRouter = require('./Order');
const cartRouter = require('./Cart');
const productRouter = require('./Product');
const paymentRouter = require('./Payment');


module.exports= {paymentRouter,userRouter, authRouter, cartRouter,productRouter,orderRouter};