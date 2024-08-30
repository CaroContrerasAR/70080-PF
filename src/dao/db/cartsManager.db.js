import CartModel from '../models/carts.model.js'

export class CartManager {
    async createCarts() {
        try {
            const newCarts = new CartModel({products: []})
            await newCarts.save()
            return newCarts               
        } catch (error) {
            console.log('Error creating carts') //luego borrar lo Log por cuestiones de rendimiento
            throw error
        }
    }

    async getCartsById (id) {
        try {
           const findCarts = await CartModel.findById(id) 
           if(!findCarts){
             throw new Error ('Cart Id not found')
           }
           return findCarts
        } catch (error) {
            console.log('Error to finding Id');
            throw error
        }
    }

    async addProductInCart(cartId, productId, quantity=1) {
        try {
            const cartsById = await this.getCartsById(cartId);
            const existProduct = cartsById.products.find(p => p.product.toString() === productId);
            if (existProduct) {
                existProduct.quantity += quantity
            } else {
                cartsById.products.push({ product: productId, quantity})
            }
            //vamos a marcar la propiedad products como modificada antes de guardar
            cartsById.markModified('products')
            await cartsById.save()
            return cartsById
        } catch (error) {
            console.log('Error adding products in cart');
            throw error
        }
    }
    // async updateCart (id, updatedCart) {
    //     try {
    //         const cartById = await CartModel.findByIdAndUpdate(id, updatedCart)
    //         if(!cartById){
    //             //console.log('Cart not found');
    //             return null
    //         } 
    //         //console.log('Cart Updated successfully');
    //         return productById
    //     } catch (error) {
    //         console.log('Error updating carts')
    //         throw error
    //     }
    // }
   
    async deleteProducts(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId)
            if(!cart){
                console.log('Cart not found');
                return null
            }
            const initialLength = cart.products.length;
            cart.products = cart.products.filter( p => p.product._id.toString() !== productId )
            if (cart.products.length !== initialLength) {
            await cart.save()
            return cart
            }else {
                return { error: 'Product not found in cart' };
            }
        } catch (error) {
            //console.log('error deleting products in cart')
            throw error
        }
    }
}
export default CartManager