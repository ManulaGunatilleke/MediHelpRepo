const mongoose = require("mongoose");
const Schema = mongoose.Schema

const empapproval = new Schema({
    Emp_ID : {
        type :String,
        require: true
    },

    Emp_Email :{
        type :String,
        require: true
    },

    approval_massage :{
        type :String,
        require: true
    }

    
})

const newApproval = mongoose.model("Approval" ,  empapproval)
module.exports = newApproval;