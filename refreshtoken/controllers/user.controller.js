const userModel = require("../models/user.models")

const bcrypt = require("bcryptjs")

const uploadImage = require("../utils/cloudinary");

const jwt = require("jsonwebtoken")

const passwordHashing = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

}

const passwordEncryption = async (password, hashedpassword) => {

    const isMatch = await bcrypt.compare(password, hashedpassword);

    return isMatch;
}


const generateAccessTokenAndRefreshToken = (userId) => {

    const accessToken = jwt.sign(
        {
            userId: userId
        },
        process.env.ACCESS_TOKEN_SECERT_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        {
            userId: userId
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );


    return { accessToken, refreshToken };

}

const healthCheck = async (req, res) => {

    try {
        return res.status(200).json({ message: "Health Check OK" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const userRegistraton = async (req, res) => {

    const { userName, email, password } = req.body

    // console.log(req.files);
    try {
        const profileLocalPath = req.files.profile[0].path;

        // Check the user is already registered with the email

        const user = await userModel.findOne({ email })

        if (user) return res.status(401).json({ message: "User is already registered " })

        //Hash the password

        const hashedPassword = await passwordHashing(password);

        // Get the image URL from Cloudinary

        const imageUrl = await uploadImage(profileLocalPath);

        // Save the user 

        const newUser = await userModel.create({
            userName, email, password: hashedPassword, profile: imageUrl
        })

        const response = await userModel.findById(newUser._id).select("-password")

        return res.status(201).json({ message: "User registered successfully", user: response })

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }



}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        // find the user

        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        const isMatch = await passwordEncryption(password, user.password);

        if (!isMatch) return res.status(404).json({ message: "Invalid credentials" });

        // Now generate the token 

        const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log("Error in login",error);
        return res.status(500).json({message:"Internal sever Error"})
    }
}

const userLogout = async (req,res)=>{
    console.log(req.user);

    // find the user and invalidate tokens
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "Unauthorized" });
    
    user.refreshToken=null;

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    return res.status(200).json({ message: "Logout successful" });
}
module.exports = {
    healthCheck,
    userRegistraton,
    userLogin,
    userLogout
}