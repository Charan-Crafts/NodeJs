const mongoose = require("mongoose")

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,

        },
        watchHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }],
        avatar: {
            type: String // Cloudinary URL
        },
        coverImage: {
            type: String // Cloudinary URL
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
)

// I want to hash the password before saving the user

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10) 
    next();
    
})

// Compare the password if password is correct it will return true or else false

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}

// Generate the access token

userSchema.methods.generateAccessToken = async function () {

    const token =  jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )

    return token;
}

// Genarate the Refresh token 

userSchema.methods.generateRefreshToken = async function () {

    const token =  jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: process.env.Jwt_REFRESH_TOKEN_EXPIRY
        }
    )

    return token;
}

 module.exports = mongoose.model("User", userSchema)
