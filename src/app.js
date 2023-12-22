import express from 'express'
import handlebars from 'express-handlebars'

import ProductManager from './dao/managers/fs/ProductManager.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import productsRouter from "./dao/routes/products.router.js"
import cartRouter from './dao/routes/carts.router.js'
import viewsRouter from './dao/routes/views.router.js'
import ProductMongo from './dao/managers/mongo/productManagerMongo.js'

const PORT = 8080
const app = express()
const path = './src/files/products.json'
const productManager = new ProductManager(path) 
const productManagerMongo = new ProductMongo()

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
    const products = await productManager.getProducts()

    socketServer.emit("listadeproductos", products)
    socket.on("realTimeProducts", async data=>{
        await productManager.addProduct(data)
        await productManagerMongo.addProduct(data)
    })
})