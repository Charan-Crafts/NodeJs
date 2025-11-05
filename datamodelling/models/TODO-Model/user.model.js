const mongoose = require("mongoose");

const userSchema =new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:[5,"Password must be at least 5 characters long"]
        },
        gender:{
            type:String,
            enum:{
                values:["Male","Female","Others"],
                message:"{VALUE} is not a valid gender"
            },
            required:[true,"Select  the Gender"]
        }
    }
    ,{timestamps:true})

export const user = mongoose.model("User",userSchema)