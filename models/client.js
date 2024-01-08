const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    userName:{
        type: String, 
        required:true
    },
    email:{
        type: String, 
        required:true,
        unique:true
    },
    phoneNumber:{
        type: String, 
        required:true
    }

}, {timestamps: true})

const userModel = new mongoose.model("user", userSchema)

module.exports= userModel