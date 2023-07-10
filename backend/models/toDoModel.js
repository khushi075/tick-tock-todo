const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('ToDo', toDoSchema)