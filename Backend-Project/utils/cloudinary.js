const cloudinary = require('cloudinary').v2

const fileSystem = require("fs")


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECERT
})

const uploadIntoCloudinary = async(filepath)=>{

    try {
        
        if(!filepath) return null;

        const response =await cloudinary.uploader.upload(filepath)

        console.log(response);

        fileSystem.unlinkSync(filepath)
        
        return response.url;
        

    } catch (error) {
        console.log("Error while uploading i cloudinary ",error);
        
    }
}

module.exports ={uploadIntoCloudinary}