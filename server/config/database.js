const mongoose = require("mongoose");
require("dotenv").config();

exports.Connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB Connected SuccessFully");
    })
    .catch((error)=>{
        console.log("DB connection Failed");
        console.error(error);
        process.exit(1);
    })
};