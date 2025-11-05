const mongoose = require("mongoose")

const medicineSchema = mongoose.Schema(
    {
        medication:{
            type:String,
            required:true
        },
        frequency:{
            type:String,
            required:true,
        },
        duration:{
            type:Number
        },
        quantity:{
            type:Number,
            required:true
        }
    })

const prescriptionSchema = mongoose.Schema(
    {
        patientDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        doctorDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        },
        medicine:{
            type:[medicineSchema]
        }
    },

    { timeStamps: true }
)

export const Prescription = mongoose.model("Prescription",prescriptionSchema);