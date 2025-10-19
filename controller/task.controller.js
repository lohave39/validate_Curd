import Task from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.dueDate) payload.dueDate = new Date(payload.dueDate);
    const task = await Task.create(payload);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const listTask=async(req,res,next)=>{
    try {
        const page=Number(req.query.page||1);
        const limit=Number(req.query.limit||10);
        const status=req.query.status;
        const search=req.query.search;
        const sort=req.query.sort||'-createdAt';

        const query={};
        if(status) query.status=status;
        if(search) query.title={$regex:search,$options:'i'};
        const skip=(page-1)*limit;
        const[item,total]=await await Promise.all([
            Task.find(query).sort(sort).skip(skip).limit(limit),
            Task.countDocuments(query)
        ])
        res.json({
            item,
            total,
            page,
            pages:Math.ceil(total/limit)
        })


    } catch (error) {
        next(error)

        
    }
}
export const getTask=async(req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({message:"Task is Not found"})
        }
        res.json(task)
        
    } catch (error) {
        next(error)
        
    }
}
export const updateTask=async(req,res,next)=>{
    try {
        const payload={...req.body};
        if(payload.dueDate===null) payload.dueDate=null;
        if(typeof payload.dueDate=='string') payload.dueDate=new Date(payload.dueDate);

        const task=await Task.findByIdAndUpdate(req.params.id,payload,{
            new:true,
            runValidators:true
        });
        if(!task){
            return res.status(404).json({message:"Task is Not Found"})
        }
        res.json(task)
        
    } catch (error) {
        next(error)
    }
}

export const delteTask=async(req,res,next)=>{
    try {
        const task=await Task.findByIdAndUpdate(req.params.id);
        if(!task) return res.status(404).send({message:"Task is Not Found"});
        res.status(204).json(task)
        
    } catch (error) {
        next(error)
        
    }

}
