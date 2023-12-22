import { Router } from "express";
import ProductManager from "../managers/fs/ProductManager.js";
import ProductMongo from "../managers/mongo/productManagerMongo.js";

const router = Router()

//metodo fs para los archivos
// const path = './src/files/products.json'
// const productManager = new ProductManager(path)

//metodo mongo para manejo de archivos
const productManager = new ProductMongo()

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()

    res.render("home", {products, style:"index"})
})

router.get("/realtimeproducts", async (req, res) =>{
    const products = await productManager.getProducts()

    res.render("realTimeProducts", {products, style:"index"})
})

export default router