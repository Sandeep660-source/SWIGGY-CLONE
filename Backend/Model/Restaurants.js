const mongoose = require("mongoose");
const  restaurantsSchema = new mongoose.Schema(
    {
        restaurantname: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
        type: String,
        required: true,
       },

        address: {
            type: String,
            required: true,
            trim:  true,
        },
        cuisine: {
            type: [String],
            requied: true,
        },

        rating:{
            type: Number,
            required: true,
            min : 1,
        },
        phone: {
            type: String,
            required: true,

        },
        foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

         
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Restaurants",restaurantsSchema);