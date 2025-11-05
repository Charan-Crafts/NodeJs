const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema(
    {
        patientInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient"
        },
        doctorDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doctor"
        },
        appointmentDate:{
            type:Date,
            required:true
        },
        status:{
            type:String,
            enum:["PENDING","CONSULTED","CANCELLED"],
            default:"PENDING"
        }
    },
    {timestamps:true}
)

export const Appointment =mongoose.model("Appointment",appointmentSchema)

https://github.com/Charan-Crafts

https://thecharan.vercel.app/