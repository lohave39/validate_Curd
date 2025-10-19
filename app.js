import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from"express-rate-limit";
import compression from "compression";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import taskRoutes from"./routes/taskRoutes.js"
const  app=express();

//middleware alll of 
app.use(helmet());
app.use(cors())
app.use(express.json({limit:"1mb"}));
app.use(compression());
app.use(morgan('dev'));
app.use(rateLimit({windowMs:15*60*1000,max:100}));


//health Check
app.get('/api/health',(req,res)=>{
    res.json({status:'ok',time:new Date().toString()})
})

app.use('/api/task',taskRoutes)

//404 +error handeling()
app.get('/api/health',(req,res)=>{
    res.json({status:'ok',time:new Date().toISOString()})
})

app.use(notFound);
app.use(errorHandler);



export default app;

