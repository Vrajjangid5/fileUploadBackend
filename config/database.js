const mongoose = require("mongoose");
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("db connected"))
    .catch((err)=>{
        console.log("There is an essue in connection");
        console.log(err);
        process.exit(1);
    })
}