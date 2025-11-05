const mongoose = require("mongoose")

const orderItemsSchema = new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
    }
})


const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING"
        },
        orderItems: {
            type: [orderItemsSchema]
        }
    },
    { timestamps: true }
)

export const Order = mongoose.model("Order",orderSchema);