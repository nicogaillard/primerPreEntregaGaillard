import mongoose from "mongoose";

const collection = "chat"

const chatSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true},
    message: {
        type: String,
        require: true}
})

const chatModel = mongoose.model(collection, chatSchema)

export default chatModel