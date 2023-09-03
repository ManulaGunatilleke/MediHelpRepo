const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Employee = new Schema({
    firstName : {
        type :String,
        require: true
    },

    lastName :{
        type :String,
        require: true
    },

    dob :{
        type :String,
        require: true
    },

    gender :{
        type :String,
        require: true
    },

    email :{
        type :String,
        require: true
    },

    p_Number :{
        type :String,
        require: true
    },

    address :{
        type :String,
        require: true
    },

    city :{
        type :String,
        require: true
    },

    province :{
        type :String,
        require: true
    },

    postal :{
        type :String,
        require: true
    },

    position :{
        type :String,
        require: true
    },

    typeofwork :{
        type : String,
        require: true
    },

    CV :{
        type :String,
        require: true
    },

    addtionalInfor :{
        type :String,
        require: true
    }


})

const newEmployee = mongoose.model("employees" ,  Employee)
module.exports = newEmployee;