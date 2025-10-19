import express from "express";

const router=express.Router();
import{getTaskQuerySchema,updateTaskSchema,createSchema} from"../schemas/task.schema.js";
import { validate } from "../middlewares/validate.middleware.js";
import {createTask,  delteTask,  getTask,  listTask, updateTask} from"../controller/task.controller.js"

router.post("/",validate(createSchema),createTask);
router.get('/',validate(getTaskQuerySchema),listTask);
router.get('/:id',getTask)
router.patch('/:id',validate(updateTaskSchema),updateTask)
router.delete('/:id',delteTask)


export default router;