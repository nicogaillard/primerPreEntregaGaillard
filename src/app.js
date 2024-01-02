import express from 'express'
import handlebars from 'express-handlebars'

import { Server } from 'socket.io'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import productsRouter from "./routes/products.router.js"
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import ProductMongo from './dao/managers/mongo/productManagerMongo.js'
import ChatMongo from './dao/managers/mongo/chatMongo.js'

const PORT = 8080
const app = express()
const path = './src/files/products.json'
const productManagerMongo = new ProductMongo()
const chatMongo = new ChatMongo()
let msg = []


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto :${PORT}`);
})

const MONGO =  "mongodb+srv://hnicolasgaillard:M3xEVUx1bnACOzLU@cluster0.cbevlpb.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connection = mongoose.connect(MONGO);

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

app.use(express.static(__dirname+"/public"))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

socketServer.on("connection", async (socket) =>{
    console.log("Nuevo cliente conectado");
    const products = await productManagerMongo.getProducts()
    let msg = await chatMongo.getChats()

    socketServer.emit("listadeproductos", products)
    socket.on("realTimeProducts", async data=>{
        await productManagerMongo.addProduct(data)
    })

    socketServer.emit("messages", msg)
    socket.on("chat-message", async(data)=>{
        await chatMongo.addChat(data)
        msg = await chatMongo.getChats()
        socketServer.emit("messages", msg)
    })
})