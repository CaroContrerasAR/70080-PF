import { Router } from 'express'
import ProductManager from '../dao/db/productsManager.db.js'

const router = Router()
const manager = new ProductManager()

router.get('/home', async (req, res) => {
    try {
        const products = await manager.getProducts()
        res.render("home", {title:'Home', products})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
    //solo con websockets, al crear o eñliminar productos se actualiza atumaticamente la vista
    try {
        const products = await manager.getProducts()
        res.render("realTimeProducts", {title:'RealTimeProducts',products})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/products', async (req, res) => {
    try {
        const limit= parseInt( req.query.limit ) || 10
        const page=parseInt( page ) || 1
        const skip = (page-1)*limit
        const sortOrder =req.query.sortOrder || null
        const filter=req.query.filter || { }
        
        const products = await manager.getProducts({
            limit, skip, sortOrder, filter
        })
        const totalProducts= await manager.getProducts().length
        const totalPages = Math.ceil(totalProducts / limit)
        
        //determinar pagina previa y siguiente
        const prevPage = page > 1 ? page - 1 : null
        const nextPage = page < totalPages ? page + 1 : null

        res.render("products", {title:'Products', },{
            products, limit, page, skip, sortOrder, filter, totalProducts, totalPages, prevPage
            // payload:products.docs,
            // page: products.page,
            // totalPages:products.totalPages,
            // hasPrevPage:products.hasPrevPage,
            // hasNextPage:products.hasNextPage,
            // prevPage: products.hasPrevPage ? products.page - 1 : null,
            // nextPage: products.hasNextPage ? products.page - 1 : null,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default router