const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Attendance = new Schema({
    Emp_Code : {
        type :String,
        require: true
    },

    Emp_FirstName :{
        type :String,
        require: true
    },

    Emp_LastName :{
        type :String,
        require: true
    },

    InTime :{
        type : String,
        require: false
    },

    OutTime:{
        type : String,
        require: false
    },

    Date :{
        type : String,
        require: true
        

    }

})

const newAttendance = mongoose.model("attendances" ,  Attendance)
module.exports = newAttendance;