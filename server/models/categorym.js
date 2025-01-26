const mongoose = require("mongoose");
const Course = require("./Course");


const categorySchema = new mongoose.Schema({
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
    }],
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    
});


module.exports = mongoose.model("Category",categorySchema);