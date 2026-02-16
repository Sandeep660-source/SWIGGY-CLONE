const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save",async function() {
  if(!this. isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  console.log("Salt",salt);
  this.password = await bcrypt.hash(this.password, salt);
  console .log("this.password",this.password);
})
module.exports = mongoose.model("User", userSchema);
