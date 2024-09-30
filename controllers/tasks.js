const Task = require('../models/Task');
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../error/custom-error")

const getAllTasks = asyncWrapper(async(req,res,next)=>{
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async (req, res,next) => {
    const task = new Task(req.body);
    await Task.create(task);
    res.status(201).json({ task });
})

const getTask = asyncWrapper( async (req, res,next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId }).exec();
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`,404));
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res,next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    res.status().json({ task });
    
})

const deleteTask = asyncWrapper(async (req, res,next) => {
    
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    res.status(200).json({task});
    
})


// PUT functionality
const editTask = asyncWrapper( async(req, re,s,next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404)); 
    }
    res.status().json({ task });
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }