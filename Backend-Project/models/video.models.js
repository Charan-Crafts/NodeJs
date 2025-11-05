const mongoose = require("mongoose")

const mongooseAggregation = require("mongoose-aggregate-paginate-v2")

const videoSchema = mongoose.Schema(
    {
        videoFile:{
            type:String // Cloudinary
        
        },
        thumbNail:{
            type:String // Cloudinary
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}
)

videoSchema.plugin(mongooseAggregation)

export const Video = mongoose.model("Video",videoSchema);