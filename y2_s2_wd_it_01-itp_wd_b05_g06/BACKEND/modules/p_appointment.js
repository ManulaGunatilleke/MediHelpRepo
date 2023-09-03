const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({

    name: {
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
    
    doctor: {
        type : String,
        required: true
    }

})

const Appointment = mongoose.model("Appointment",AppointmentSchema)

module.exports = Appointment;