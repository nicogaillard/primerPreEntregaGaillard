import { Router } from "express";
import ProductManager from "../managers/ProductManager.js"

const path = './src/files/products.json'
const productManager = new ProductManager(path) 
const router = Router()

router.get('/', async (req, res) => {
        const products = await productManager.getProducts()
    
        let limit = req.query.limit
    
        let productsFilter = products.slice(0, limit)
    
        if(!limit){
            return res.send({
                status : "succes",
                products: products})
        }
        res.send({
            status: "succes",
            msg: `Productos limitados a la cantidad: ${limit}`,
            products: productsFilter})
})

router.get('/:pid', async (req, res) => {
        const pid = req.params.pid

        const product = await productManager.getProductById(pid)
    
        res.send({
            status: "succes",
            msg: `Producto filtrados por ID: ${pid}`,
            products: product})
        
    })

router.post('/', async(req, res)=> {
    const products = await productManager.getProducts()
    const product = req.body
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.status){
        return res.send({
            status: "error",
            msg: "Todos los campos son obligatorios"
        })
    }
    await productManager.addProduct(product)
    res.send({
        status: "succes",
        msg: {...products, ...product}
    })
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const product = req.body
    
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.status){
        return res.send({
            status: "error",
            msg: "Todos los campos son obligatorios"
        })
    }

    await productManager.updateProduct(pid, product)

    res.send({
        status: "succes",
        msg: `El producto con el ID: ${pid} fue actualizado`,
        product: product
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    await productManager.deleteProducts(pid)

    res.send({
        status: "succes",
        msg: `Producto con el ID ${pid} eliminado`
    })
})

export default router