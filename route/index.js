const express = require('express');
const route = express.Router();
const taskController = require('../Controller/TaskController');

// Get one by id
route.get("/:id", taskController.getById)

//Post
route.post('/', taskController.addTask);

//Put
route.put('/:id', taskController.updateTask);

// Delete
route.delete('/:id', taskController.deleteTask);

// Get all
route.get("/", taskController.getAll);

module.exports = route;
