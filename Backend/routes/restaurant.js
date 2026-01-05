const express=require('express');
const router= express.Router();
const Restaurants=require("../Model/Restaurants.js");
router.post("/",async(req,res)=>{
    try{
        const{restaurantname,address,cuisine,rating,phone,foodType,image}=req.body;
        const existingRestaurant = await Restaurants.findOne({restaurantname,phone})
        if(existingRestaurant){
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists"
            });
        }else{
            const newRestaurant = new Restaurants({
                restaurantname,
                address,
                cuisine,
                rating,
                phone,
                image,
                foodType,

            });
            await newRestaurant.save();
            return res.status(201).json({
                sucess : true,
                message: "Restaurant added Successfully", newRestaurant
            })
        }
    }catch(error){
        console.error("Error adding restaurant",error);
    }
})
router.get("/", async (req,res)=>{
    try{
        const restaurants = await Restaurants.find();
        res.status(200).json({
            success: true,
            messege: "Successfully fetched all restaurants",
            restaurants: restaurants
        })
    }
    catch(error){
        console.log("Failed to fetch restaurants",error)

            res.status(400).json({
            success: false,
            message: "Failed to fetch all restaurants",
            error: error,
        });
    }
})










module.exports=router;
