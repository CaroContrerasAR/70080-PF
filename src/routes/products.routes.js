import {Router} from 'express'
import ProductManager from '../dao/db/productsManager.db.js'

const router = Router()
const manager = new ProductManager()

//Product List & http://localhost:8080/api/product?limit=2
router.get('/', async (req, res)=>{
    const {limit} = req.query
    try {
        const arrayProduct = await manager.getProducts()
        if(limit){
            res.status(200).send(arrayProduct.slice(0, limit))
        } else {
            res.status(200).send(arrayProduct)
        }
    }catch (error) {
        res.status(500).send({ error : error.message, message:"GET Error"})
    }
})

router.get('/:pid', async (req,res)=>{
    let id = req.params.pid
    try {
        const product = await manager.getProductById(id)
        if (!product) {
            res.status(400).res.send({message:'Product not found'})
        }
        res.status(200).send({product})
    } catch (error) {
        res.status(500).send({ error : error.message, message:"GET Error with PID" })
    }
})

router.post('/', async (req, res)=>{
    const newProduct = req.body
    try {
        const product = await manager.addProduct(newProduct)
        if(!product){
            res.status(400).res.send({message:'Product not found'})
        }
        return res.status(201).json({message:'Product Added successfully'})
    } catch (error) {
        res.status(500).send({ error : error.message, message:"POST Error" })
    }
})

router.put('/:pid', async (req, res)=>{
    const id = req.params.pid
    const updateProduct = req.body
    try {
        const result = await manager.updateProducts(id, updateProduct)
        if(!result){
            res.status(400).res.send({message:'Product not found'}) 
        }
        return res.status(200).json({message:'Product Updated'})
    } catch (error) {
        res.status(500).send({ error : error.message, message:"PUT Error" })
    }
})

router.delete('/:pid', async (req, res)=>{
    const id = req.params.pid
    try {
        const result = await manager.deleteProducts(id)
        if(!result){
            res.status(404).res.send({message:'Product not found'}) 
        }
        res.status(200).json({message:'Product Deleted'})
    } catch (error) {
        res.status(500).send({ error : error.message, message:"DEL Error" })
    }
})

export default router