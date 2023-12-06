import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router()
const path = './src/files/products.json'
const productManager = new ProductManager(path)

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()

    res.render("home", {products, style:"index"})
})

router.get("/realtimeproducts", async (req, res) =>{
    const products = await productManager.getProducts()

    res.render("realTimeProducts", {products, style:"index"})
})

export default router