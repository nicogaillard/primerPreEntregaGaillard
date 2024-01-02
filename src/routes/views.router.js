import { Router } from "express";
import ProductManager from "../dao/managers/fs/ProductManager.js";
import ProductMongo from "../dao/managers/mongo/productManagerMongo.js";
import ChatMongo from "../dao/managers/mongo/chatMongo.js" 

const router = Router()

//metodo fs para los archivos
// const path = './src/files/products.json'
// const productManager = new ProductManager(path)

//metodo mongo para manejo de archivos
const productManager = new ProductMongo()
const chatMongo = new ChatMongo()

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()

    res.render("home", {products, style:"index"})
})

router.get("/realtimeproducts", async (req, res) =>{
    const products = await productManager.getProducts()

    res.render("realTimeProducts", {products, style:"index"})
})

router.get("/chatbox", async (req, res)=>{
    const chat = await chatMongo.getChats()

    res.render("chatBox", {chat, style:"index"})
})

export default router