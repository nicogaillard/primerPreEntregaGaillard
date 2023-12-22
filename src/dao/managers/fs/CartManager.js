import fs from 'fs'

class CartManager {
    constructor(pathFile) {
        this.path = pathFile
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)
            return carts
        } else {
            return {
                status: "error",
                msg: "no hay Carritos creados"
            }
        }
    }

    getCartByID = async (idCart) => {
        const carts = await this.getCarts()

        let cartById = carts.find(el => el.id == idCart)

        if (cartById) {
            return cartById
        } else {
            return {
                status: "error",
                msg: `No existe un carrito con el ID: ${idCart}`
            }
        }
    }

    addCart = async () => {
        const carts = await this.getCarts()

        let cart = {
            "id": 0,
            "products": []
        }

        if (carts.length === 0) {
            cart.id = 1
        } else {
            cart.id = carts[carts.length - 1].id + 1
        }

        carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return {
            status: "succes",
            msg: "Carrito agregado al listado",
            carts: carts
        }
    }

    addProdCart = async (cid, pid) => {
        const carts = await this.getCarts()
        const cart = await this.getCartByID(cid)

        let productExists = cart.products.find(el => el.product == pid)
        let cartsFilter = carts.filter(el => el.id != cid)

        let product = {
            "product": pid,
            "quantity": 0
        }

        if (!productExists) {
            product.quantity = 1
            cart.products.push(product)
            cartsFilter.push(cart)
        } else {
            productExists.quantity = productExists.quantity + 1
            cartsFilter.push(cart)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFilter, null, '\t'))
    }

    deleteCart = async (idCart) => {
        let carts = await this.getCarts()
        let cartsFilter = carts.filter(el => el.id != idCart)

        if (cartsFilter == []) {
            return {
                status: "Error",
                msg: `el Carrito con ID:${idCart} no existe`,
                carts: carts
            }
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFilter, null, '\t'))
        }
    }
}

export default CartManager