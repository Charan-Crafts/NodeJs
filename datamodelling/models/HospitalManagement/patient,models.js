const mongoose = require("mongoose")


const addressSchema = mongoose.Schema({
    street:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    }
})

const patientSchema = new mongoose.Schema(
    {
        patientName:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            min:[0,"Age must be positive"],
            max:[100,"Age must be less than 100"]
        
        },
        gender:{
            type:String,
            enum:["MALE","FEMALE","OTHERS"],
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        address:{
            type:addressSchema
        }
    },

    { timestamps: true }

)

export const Patient = mongoose.model("Patient",patientSchema);