const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    fname: {
        type : String,
        required: true
    },

    lname: {
        type : String,
        required: true
    },

    age: {
        type : Number,
        required: true
    },

    gender: {
        type : String,
        required: true
    },

    phonenumber: {
        type : Number,
        required: true
    },

    email: {
        type : String,
        required: true
    },

    password: {
        type : String,
        required: true
    }

})

const Admin = mongoose.model("Admin",AdminSchema)

module.exports = Admin;