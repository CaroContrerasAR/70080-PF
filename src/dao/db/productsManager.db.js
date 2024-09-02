import ProductModel from '../models/products.model.js'

class ProductManager {
    
    async addProduct (product) {
        try {
            //esto lo valida el Schema, puede quedar como doble
            if(!product.title || !product.description || !product.code || !product.price || !product.img || !product.stock || !product.category ){
                return 'All fields are required'
            }
             
            const validateCode = await ProductModel.findOne({code: product.code})
            if(validateCode){
                return `Code ${product.code} already exists`
            }
    
            const newProducts = new ProductModel ({
                title:product.title,
                description:product.description,
                price:product.price,
                img:"no tiene",
                code:product.code,
                stock:product.stock,
                category:product.category,
                status: true,
                thumbnails:product.thumbnails
            })
            await newProducts.save()
            // return 'product added successfully'      
            
        } catch (error) {
            console.log('Error adding product');
            throw error
        }
    }
    //SIN Paginate
    // async getProducts () {
    //     try {
    //         return await ProductModel.find().lean()
    //     } catch (error) {
    //         console.log('Error getting products ')
    //         throw error
    //     }
    // }
    async getProducts ({ page = 1, limit = 10, sort = 1, category = null} = {}) {
        try {
            const filter = {}
            if(category){
                filter,category = category
            }
            const options ={
                page,
                limit,
                sort : {price: sort}
            }
            const result = await ProductModel.paginate(filter, options)
            return result
        } catch (error) {
            console.log('Error getting products ')
            throw error
        }
    }

    async getProductById(id) {
        try {
            const productById = await ProductModel.findById(id)
            if(!productById){
                //console.log('Product not found')
                return null
            }
            return productById
            
        } catch (error) {
            console.log('Error finding products by Id ')
            throw error
        }
    }

    async updateProducts (id, updatedProduct) {
        try {
            const productById = await ProductModel.findByIdAndUpdate(id, updatedProduct)
            if(!productById){
                console.log('Product not found');
                return null
            } 
            console.log('Product Updated successfully');
            return productById
        } catch (error) {
            console.log('Error updating products')
            throw error
        }
    }
   
    async deleteProducts(id) {
        try {
            let products = await ProductModel.findByIdAndDelete(id)
            if(!products){
                //console.log('Product not found');
                return null
            }
            //console.log('Product deleted successfully');
            return products
        } catch (error) {
            console.log('error deleting products ')
            throw error
        }
    }
}

export default ProductManager