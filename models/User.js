import mongoose from "mongoose";


export const  UserSchema=new mongoose.Schema({
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
    },   
     password: {
    type: String,
    required: [true, "Password is required"],
  },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

})