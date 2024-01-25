const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    timeOfRegistration:{
        type: Date,
        required: true,
        default: Date.now
    }

    })

    module.exports = mongoose.model('users', userSchema );