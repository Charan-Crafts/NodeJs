const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema(
    {
        doctorName:{
            type:String,
            required:true
        },
        specializattion:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        experience:{
            type:Number,
            required:true
        }
    },
    { timeStamps: true }
)

export const Doctor = mongoose.model("Doctor",doctorSchema);