import mongoose from "mongoose";

const collection = "Product"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true},
    description: {
        type: String,
        require: true},
    category: {
        type: String,
        require: true},
    status: Boolean,
    price: {
        type: Number,
        require: true},
    thumbnail: {
        type: String,
        require: true},
    code: {
        type: String,
        require: true},
    stock: {
        type: Number,
        require: true}
})

const productModel = mongoose.model(collection, productSchema)

export default productModel