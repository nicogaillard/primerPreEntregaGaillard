import mongoose from "mongoose";

const collection = "Product"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true},
    description: {
        type: String,
        required: true},
    category: {
        type: String,
        required: true},
    status: Boolean,
    price: {
        type: Number,
        required: true},
    thumbnail: {
        type: String,
        required: true},
    code: {
        type: String,
        required: true},
    stock: {
        type: Number,
        required: true}
})

const productModel = mongoose.model(collection, productSchema)

export default productModel