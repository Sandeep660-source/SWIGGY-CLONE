const express=require('express');
const router= express.Router();
const  MenuItem = require("../Model/MenuItem.js");
const Restaurant = require("../Model/Restaurants.js");


router.post("/",async(req,res)=>{
    try{

    
        const{restaurantId,name,description,price,image,category,foodType,isAvailable}= req.body;
        if(!restaurantId ||
            !name||
            !description||
            !price||
            !image||
            !category||
            !foodType
        ){
            res.status(400).json({
                success: false,
                message: "Please add  all data including , restaurantId,name,description, price, image, category,foodType"
            })
        }

        const  restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            res.status(404).json({
                success : false,
                message : "The restaurant associated with restautarantid doesnot exist",
                id: restaurantId

            })
        }
        const newMenuItem =  new MenuItem({
            restaurantId,
            name,
            description,
            price,
            image,
            category,
            foodType,
            isAvailable,

        });
        await newMenuItem.save();
        res.status(200).json({
            success :true,
            message : "Successfully created menuItem",
            menuItem: newMenuItem
        })



    }
    catch(error){
        console.log("Error Creating Menu item");
        res.status(500).json({
            success : false,
            message : "error creating menuitem",
            error : error
        })
    }

})


router.get("/restaurant/:restaurantId" ,async (req,res)=>{

    try{
         const restaurantId = req.params.restaurantId
        const menuItem = await MenuItem.find({
            restaurantId : restaurantId,
            


        })
        if(!menuItem){
            res.status(404).json({
                success:false,
                message : "No menu items found for  restaurant"
            })
        }res.status(200).json({
            success : true,
            message : "successfully fetched menuitems",
            menuItems : menuItem

        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "failed to fetch menu Items from restaurant "
        })
        console.log("failed to fetch menuitem",error);
    }
})


module.exports= router;