const express=require('express');
const router=express.Router();
const User=require("../Model/User.js");

router.post("/signup",async(req,res)=>{
    try {
        const{firstname,lastname,email,phone,password,confirmpassword}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ success:false,message:"User already exists"});
        }else{
            const newUser=new User({
                firstname,
                lastname,
                email,
                phone,
                password,
            });
            await newUser.save();
            return res.status(201).json({ success:true,message:"User registered successfully",newUser:{id:newUser._id,firstname:newUser.firstname,lastname:newUser.lastname,email:newUser.email,phone:newUser.phone}});
        }
    } catch (error) {
        console.error("Error during signup:", error);
    }
})
router.post("/login",async(req,res)=>{
    try {

        const {email, password}=req.body;
        const foundUser = await User.findOne({email});
        console.log("founduser",foundUser)
         if (!foundUser){
            res.status(400).json({
                success : false,
                message : "User not found for Email",
            })
        }

        const isPasswordMatched=(password== foundUser.password)
        
         if(!isPasswordMatched){
            res.status(401).json({
                success: false,
                message : "Password doesn't Match",
                isLogggedIn : false
            })
        

        }
        res.status(200).json({
            success : true,
            message : "Successfully Loged In",
            isLoggedIn : true

            })
    } catch (error) {
        console.error("Error during login:", error);
    }
})


module.exports=router;










