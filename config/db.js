const mongoose = require("mongoose")


const mongoConnect = async()=>{

    const connectDB = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO DB CONNECTED ${connectDB.connection.host}`);
}

module.exports = mongoConnect