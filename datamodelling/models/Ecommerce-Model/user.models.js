const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            minlength:[6,"Password atleast 6 characters long"]
        },
        gender:{
            type:String,
            enum:["MALE","FEMALE","OTHERS"],
            required:true
        },
        contactNumber:{
            type:Number,
            required:true
        }
    },
    { timestamps: true },
)

export const User = mongoose.model("User", userSchema);