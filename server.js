
import dotenv from "dotenv";
import { DbConnect } from "./config/db.js";
import app from "./app.js"
dotenv.config();




const port=process.env.PORT;




const start =async () => {
  try {
    
      await DbConnect();
   app.listen(port,()=>{
    console.log(`Server is Listening ${port}`)
   })

  } catch (error) {
    console.log(error,"Error in Server File ")
        process.exit(1);
    
  }
}

start()