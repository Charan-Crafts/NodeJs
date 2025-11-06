const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        },
        profile:{
            type:String // Cloudinary URL
        }
    },
    {timestamps:true}
)

const User = mongoose.model("User",userSchema);

module.exports = User;