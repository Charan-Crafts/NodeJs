const userModel = require("../models/user.models.js")

const cloudinary = require("../utils/cloudinary.js")

 const healthCheck = async (req, res) => {

    try {

        return res.status(200).json({ message: "Okay" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

const userRegistration = async(req,res)=>{

    //

    const {fullName,email,password,userName} = req.body;
        
    const avatarImageLocalPath = req.files.avatar[0].path;

    const coverImageLocalPath = req.files.coverImage[0].path;

    // Check the user is already registered or not

    const isUserExist = await userModel.findOne({
        email
    })

    if(isUserExist)return res.status(400).json({message:"User is already registered with this Email"})

    // if(isUserExist.userName === userName) return res.status(400).json({message:"User is already registered with this UserName"})


    // Now save the images in the cloudinary
    
    const avatarUrl = await cloudinary.uploadIntoCloudinary(avatarImageLocalPath)

    const coverImageUrl = await cloudinary.uploadIntoCloudinary(coverImageLocalPath);

    const newUser = await userModel.create({
        fullName,email,password,avatar:avatarUrl,coverImage:coverImageUrl,userName
    })
    
    const response = await userModel.findById(newUser._id)

    return res.status(201).json({message:"User registered successfully", user:response})
    
}

module.exports ={
    healthCheck,userRegistration
}