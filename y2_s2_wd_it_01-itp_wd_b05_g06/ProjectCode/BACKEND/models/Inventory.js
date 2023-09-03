const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema =new Schema({

    mediname :{
        type :String,
        required:true
    },

    supplier :{
        type :String,
        required:true
    },

    quantity :{
        type:String,
        required:true
    },

    meditype :{
        type:String,
        required:true
    },

    medino :{
        type:String,
        required:true
    }
})

const Inventory = mongoose.model("Inventory",InventorySchema);
module.exports=Inventory;