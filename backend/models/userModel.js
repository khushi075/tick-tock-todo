const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup method
userSchema.statics.signup = async  function ( email, password, username)  {
    //validation
    if (!email || !password || !username) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters long, contain a number and a special character and both uppercase and lowercase letters')
    }
    if(username.length < 3) {
        throw Error('Username must be atleast 3 character long')
    }


    const exists = await this.findOne({email})
    const exists2 = await this.findOne({username})
    if(exists) throw new Error('Email already in use')
    if(exists2) throw new Error('Username already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email,password:hash,username})

    return user

}

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw new Error('Email not registered')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw new Error('Incorrect password')
    }
    return user

}

module.exports = mongoose.model('User', userSchema)