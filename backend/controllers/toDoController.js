const ToDo = require('../models/toDoModel')
const mongoose = require('mongoose')

//get all todos
const getToDos = async (req, res) => {
    const user_id = req.user._id
    try {
        const toDos = await ToDo.find({user_id}).sort({ createdAt: -1 })
        res.status(200).json(toDos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//get a single todo
const getToDo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'ToDo not found'})
    }

    const toDo = await ToDo.findById(id)

    if(!toDo){
       return res.status(404).json({error: 'ToDo not found'})
    }

    res.status(200).json(toDo)
}

//create a todo
const createToDo = async (req, res) => {
    const { title, completed, descr } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!completed) {
        emptyFields.push('completed')
    }
    if (!descr) {
        emptyFields.push('descr')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Please fill in the following fields: ${emptyFields.join(', ')}` })
    }

    //add doc to db
    try {
        const user_id = req.user._id
        const toDo = await ToDo.create({ title, completed, descr, user_id })
        res.status(200).json(toDo)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a todo
const deleteToDo = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'ToDo not found'})
    }

    const toDo = await ToDo.findOneAndDelete({_id:id})

    if(!toDo){
         return res.status(404).json({error: 'ToDo not found'})
    }

    res.status(200).json(toDo)
}

//update a todo
const updateToDo = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'ToDo not found'})
    }

    const toDo = await ToDo.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!toDo){
         return res.status(404).json({error: 'ToDo not found'})
    }

    res.status(200).json(toDo)
}


module.exports = {
    createToDo,
    getToDos,
    getToDo,
    deleteToDo,
    updateToDo
}