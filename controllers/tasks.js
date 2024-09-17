const Task = require('../models/Task');

const getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find({});  
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async(req,res)=>{
    try {
        const task = new Task(req.body);
        await Task.create(task);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const getTask = async(req,res)=>{
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id:taskId}).exec();
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskId}`});
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const updateTask = async(req,res)=>{
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskId}, req.body,{
            new:true,
            runValidators:true
        });
        if(!task){
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status().json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}
const deleteTask = async(req,res)=>{
    try{
        const {id:taskId} = req.params;
        const task = await Task.findOneAndDelete({_id:taskId});
        if(!task){
            return res.status(404).json({ msg: `No task with id: ${taskId}`});
        }
        // res.status(200).json({task});
    }catch(error){
        res.status(500).json({ msg: error })
    }
}


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask}