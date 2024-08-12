const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
app.use(express.json());
app.use(cors()); 
const Razorpay = require('razorpay');

var RZP = new Razorpay({
  key_id: 'rzp_test_dTnukFGWZUKA0z',
  key_secret: 'xAIhQ6q8RoNLrFQuQeOJpNvf',
});

app.get('/create',async(req,res)=>{
    const {amount} = req.query;
    console.log(req.query)
    const order  = await RZP.orders.create({
        "amount": amount*100,
        "currency": "INR",
        "receipt": "receipt#1",
        "partial_payment": false,
        "notes": {
          "key1": "value3",
          "key2": "value2"
        }
      })
      res.json({message:"from serverrr create",data:order})
})


app.listen(process.env.PORT,()=>{
    console.log(`server is running at port http://localhost:${process.env.PORT}`)
})