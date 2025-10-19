import User from "../models/User.js";
import jwt from "jsonwebtoken";

import bcrypt from"bcrypt"


export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send response (exclude password)
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // 3️⃣ Verify role (optional — only if your system uses roles)
    if (role && user.role !== role) {
      return res.status(403).json({ message: "Unauthorized role access" });
    }

    
    console.log("Password from body:", password);
console.log("Password from DB:", user.password);

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }


    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY, // make sure it's defined in .env
      { expiresIn: "1d" } // token valid for 1 day
    );

    // 6️⃣ Send response (exclude password)
    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json(error.message)
    next(error);
  }
};