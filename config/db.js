import mongoose from "mongoose";

export const DbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI),
        console.log("Connected  to Database")
        
    } catch (error) {
        console.log("getting an error in connectin in database")
        
    }
}
