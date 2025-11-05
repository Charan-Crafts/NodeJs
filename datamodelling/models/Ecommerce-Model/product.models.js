const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        productDescription:{
            type:String,
            required:true
        },
        productImage:{
            type:String,
            required:true
        },
        stock:{
            type:Number,
            default:0
        },
        price:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)

export const Product = mongoose.model("Product",productSchema);