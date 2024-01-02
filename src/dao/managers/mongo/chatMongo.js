import chatModel from "../../models/chat.model.js";

class ChatMongo {
    async getChats(){
        return await chatModel.find().lean()
    }
    async addChat(msg){
        return await chatModel.create(msg)
    }
}

export default ChatMongo