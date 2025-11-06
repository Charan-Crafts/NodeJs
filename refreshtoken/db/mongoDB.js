const mongoose = require("mongoose")

const connection = async ()=>{

    try {

        const connection = await mongoose.connect(process.env.MONGODB_URL)

        console.log("Connected to MONGO DB")
        
    } catch (error) {
        console.log("Error while connecting to MONGO ",error);
        
    }
}

module.exports = connection;