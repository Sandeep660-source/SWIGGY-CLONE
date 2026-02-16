const express=require('express');
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
app.use(cors());
app.use(express.json());
const authRoutes=require("./routes/auth.js");
const restaurantRoutes = require("./routes/restaurant.js");
const MenuItemRoutes = require("./routes/MenuItem")
const orderRoutes = require("./routes/order");


const connectDB=require("./Connection/db.js");
connectDB();
app.get("/",(req,res)=>{
    res.send("Swiggy Backend is running");
});
app.use("/api/auth",authRoutes)
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/menuitem",MenuItemRoutes )
app.use("/api/orders", orderRoutes);
const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});










