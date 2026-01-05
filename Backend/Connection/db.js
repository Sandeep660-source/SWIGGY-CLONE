const mongoose = require("mongoose")

const ConnectDB = async()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://kssandeep8007_db_user:8Xw5YOfmLxgcN6oY@studentmanagement.xauktbj.mongodb.net/Swiggy")
        console.log("MongoDb connected Sucessfully" )
        

    }catch(error){
        console.log("Eroor Connecting Mongodb",error.message)
    }
}

module.exports = ConnectDB;