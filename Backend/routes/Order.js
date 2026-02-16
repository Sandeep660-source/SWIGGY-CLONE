const express = require("express");
const router = express.Router();
const Order = require("../Model/Order");
const authMiddleware = require("../Middleware/auth");



router.post("/",authMiddleware, async (req, res) => {
  try {
    
    const userId = req.user.id;
    
    const {  restaurantId, items, totalPrice, deliveryAddress } = req.body;

    if ( !items || !totalPrice || !deliveryAddress) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      restaurantId,
      items,
      totalPrice,
      deliveryAddress,
    });

    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/",authMiddleware,async (req,res)=>{
  try{
    const userId = req.user.id;

    const orders = await Order.find({
      userId : userId})
      res.status(200).json({
        success: true,
        message: "Orders fetched Successfully",
        orders: orders

      })

  }catch(error){
    console.error("Error Fetching orders:",error);
  }
} 

)



module.exports= router;