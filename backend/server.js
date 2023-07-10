require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//creates express app
const app = express()
const todosRoute = require('./routes/toDos')
const userRoutes = require('./routes/user')

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/todos', todosRoute)
app.use('/api/users', userRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listening for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening for requests on port', process.env.PORT, 'yayyy ppl')
        })
    })
    .catch((err) => { console.log(err) })

