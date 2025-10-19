import mongoose from "mongoose";


 const  UserSchema=new mongoose.Schema({
      name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    }, email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // don't return password in queries by default
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

})

const User=mongoose.model('User',UserSchema);
export default User