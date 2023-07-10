const express = require('express');
const { create } = require('../models/toDoModel');
const { createToDo, getToDo, getToDos, deleteToDo, updateToDo } = require('../controllers/toDoController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//requireAuth for all todo routes
router.use(requireAuth)

//get all todos
router.get('/',getToDos)

//get a single todo
router.get('/:id',getToDo)

//create a todo
router.post('/', createToDo)

//delete a todo
router.delete('/:id',deleteToDo)

//update a todo
router.patch('/:id',updateToDo)

module.exports = router