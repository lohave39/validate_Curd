import User from "../models/User.js";
import jwt from "jsonwebtoken";

import bcrypt from"bcrypt"
import { hash } from "zod";

 export const register=async(req,res,next)=>{
    try {
        const {name,email,password,role}=req.body;

        const isUserAlreadyExist=await User.findOne({email});
        if(isUserAlreadyExist) return res.json({message:"The User is Already exist in the Database plese use Another email Adres"})

            if(!name && !email && password && role){
                return res.json({message:"All field is requred"})
            }

            const isPassword=await bcrypt.hash(password,10)

            const user=await User.create({
                name,
                email,
                password:isPassword,
                role
            })

            res.status(200).json({message:"User Are is register Sucessfully",data:user})

        
        
    } catch (error) {
        next(error)
    }
 }


export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // ✅ 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // ✅ 2. Check role (optional)
    if (role && user.role !== role) {
      return res.status(403).json({ message: "Unauthorized role access" });
    }

    // ✅ 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // ✅ 4. Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // 1 day expiry
    );

    // ✅ 5. Respond with token
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
