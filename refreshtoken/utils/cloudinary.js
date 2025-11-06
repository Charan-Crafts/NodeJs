const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERT
})



const uploadImage = async (localFilePath)=>{

    try {
        const response = await cloudinary.uploader.upload(localFilePath);

        return response.url;

    } catch (error) {
        console.log("Error while uploading the image into the cloudinary ",error);
        return null;
    }
}

module.exports = uploadImage;