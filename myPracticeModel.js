const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    _id : {
        type: Number,
        required : true
    },
    name : {
        type: String,
        required: true
    },
    age : {
        type: String,
        required : true
    }
},{versionKey : false})

module.exports = mongoose.model("Employee",Employee,"employee")
