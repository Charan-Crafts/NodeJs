const mongoose = require("mongoose")

const {DATABASE_NAME} = require("../constants")




const connection = async()=>{

    try {
        
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);

        console.log("Mongo DB is Connected ..");
        

    } catch (error) {
        console.log("Mongo Connection Error ",error);
        
    }
}

module.exports = connection;