import { model, Schema } from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    amount: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        // type: Schema.Types.ObjectId,
        // ref: "Categories"
        require: true,
    },
    description: {
        type: String
    }
}, { timestamps: true });

export const Product = model("Product", ProductSchema);