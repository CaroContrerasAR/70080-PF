import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { Server } from "socket.io"

import './db.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'

//fs
//import ProductManager from './dao/fs/conproductsManager.controller.js'
//const manager = new ProductManager('./dao/fs/data/products.json')
import ProductManager from './dao/db/productsManager.db.js'
const manager = new ProductManager()

const app = express()
const PORT = 8080

//configuracion Express-Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Midlewares
app.use(express.json())
app.use(express.static("./src/public"))
app.use(express.static("./src/public"))

//Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


app.get('/',(req,res)=>{
        res.send(`<h1>PF Backend I - Carolina Contreras</h1>`)
})
    
// app.get('/', (req,res)=>{
//     res.render("home")
// })
    
//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Server Listening in Port ${PORT}`); 
})
    
//Instancia de websocket desde el lado del backend
const io = new Server(httpServer)

io.on("connection",async(socket)=>{
    console.log("A customer logged in");
    socket.emit("products", await manager.getProducts()) 
        
    socket.on("deleteProduct", async(id)=>{
        if(id){
            await manager.deleteProducts(id)
        io.sockets.emit("products",await manager.getProducts())
        } else {
            console.error('Product ID is undefined')
        }
        
    })

    socket.on("addProduct", async (product) => {
        // Verificación básica de campos necesarios
        if (!product || typeof product !== 'object') {
            console.error('Invalid product data');
            return;
        }
    
        // Validar que todos los campos requeridos están presentes y no están vacíos
        const { title, description, code, price, stock, category, thumbnail } = product;
    
        if (!title || typeof title !== 'string' || title.trim() === '') {
            console.error('Product title is required and must be a non-empty string');
            return;
        }
    
        if (!description || typeof description !== 'string' || description.trim() === '') {
            console.error('Product description is required and must be a non-empty string');
            return;
        }
    
        if (!code || typeof code !== 'string' || code.trim() === '') {
            console.error('Product code is required and must be a non-empty string');
            return;
        }
    
        if (isNaN(price) || price <= 0) {
            console.error('Product price is required and must be a positive number');
            return;
        }
    
        if (isNaN(stock) || stock < 0) {
            console.error('Product stock is required and must be a non-negative integer');
            return;
        }
    
        if (!category || typeof category !== 'string' || category.trim() === '') {
            console.error('Product category is required and must be a non-empty string');
            return;
        }
    
        // `thumbnail` es opcional y puede ser una cadena vacía o una URL válida
        if (typeof thumbnail !== 'string') {
            console.error('Product thumbnail must be a string');
            return;
        }
    
        // Agregar el producto
        try {
            await manager.addProduct(product);
            io.sockets.emit("products", await manager.getProducts());
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });
})