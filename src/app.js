import express from 'express'
import productsRouter from "./routes/products.router.js"

import __dirname from './utils.js'
import cartRouter from './routes/carts.router.js'

const PORT = 8080

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const server = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto :${PORT}`);
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

