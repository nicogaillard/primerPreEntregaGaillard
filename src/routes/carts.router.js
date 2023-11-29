import { Router } from "express";
import  CartManager  from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const path = './src/files/carts.json'
const pathProducts = './src/files/products.json'
const router = Router()
const cartManager = new CartManager(path)
const productManager = new ProductManager(pathProducts)

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts()

    res.send({
        status: "succes",
        carts: carts
    })
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid

    const cart = await cartManager.getCartByID(cid)

    res.send({
        status: "succes",
        cart: cart
    })
})

router.post('/', async (req, res) => {
    let addCart = await cartManager.addCart()
    res.send({
        status: "succes",
        msg: `Carrito agregado`,
        carts: addCart
    })
})


router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid
    const carts = await cartManager.deleteCart(cid)

    res.send({
        status: "succes",
        carts: carts
    })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const product = await productManager.getProductById(pid)
    const cart = await cartManager.getCartByID(cid)

    if(cart.id == cid){
    if(product.id == pid){
        let product = await cartManager.addProdCart(cid, pid)
        res.send({
            status: "succes",
            msg: `Ruta POST CARTS agrego al carrito ${cid} el producto con el ID:${pid} `,
            product: `El producto agregado es ${product}`
        })
    }else {
        res.send({
            status: "error",
            msg: `El producto con el ID:${pid} no existe`
        })
    }} else {
        res.send({
            status: "error",
            msg: `El Carrito con ID:${cid} no existe`
        })
    }
})

export default router