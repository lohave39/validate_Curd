import mongoose from "mongoose";
import { trim } from "zod";

const taskSchemas= new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,default:''},
    status:{type:String,enum:['pending','in_progress','done'],default:'pending'},
    priority:{type:Number,min:1,max:5,default:3},
    dueDate:{type:Date,default:null}
},{timestamps:true})

const Task=mongoose.model('Task',taskSchemas);
export default Task;


