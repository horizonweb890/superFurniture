const mongoose = require("mongoose");
const Category = require("./productCategory.model.js");

const productModel = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productModel);

module.exports = Product;
