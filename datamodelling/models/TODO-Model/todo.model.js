const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        descrption:{
            type:String,
            required:true
        },
        completed:{
            type:Boolean,
            default:false
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)

export const todo = mongoose.model("TODO",todoSchema);