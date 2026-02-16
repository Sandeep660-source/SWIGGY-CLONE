const express=require('express');
const router= express.Router();
const Restaurants=require("../Model/Restaurants.js");
router.post("/",async(req,res)=>{
    try{
        const{name,address,cuisine,rating,phone,foodType,image}=req.body;
        const existingRestaurant = await Restaurants.findOne({name,phone})
        if(existingRestaurant){
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists"
            });
        }else{
            const newRestaurant = new Restaurants({
                name,
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
router.get("/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        
        const restaurant = await Restaurants.findById(id);
        if(!restaurant){
             res.status(400).json({
                success: false,
                message: "restaurant not found",

            })
        }
        else{
            res.status(200).json({
                success : true,
                message: "restaurant fetched succcessfully",
                restaurant : restaurant,

            })
        }



    }catch(error){
        console.error("Error fetching restaurant by ID:",error);
        res.status(500).json({
            success: false,
            message: "Server error",
        })

    }
})












module.exports=router;
