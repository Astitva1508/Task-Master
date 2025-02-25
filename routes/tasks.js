const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, deleteTask, updateTask, getTask, editTask } = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask).put(editTask);


module.exports = router;