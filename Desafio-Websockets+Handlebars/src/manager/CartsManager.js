import fs from 'fs';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();

class CartManager {
    
    constructor() {
        this.path = './src/data/carrito.json'
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.path)) {
                const userJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(userJSON)
            } else return [];
        } catch (error) {
            console.log(error)
        }
    }
    
    async addCart() {
        try {
            const carts = await this.getCarts();
            const cart = {
                id: await this.#getMaxId() + 1,
                products: [],
            }
                carts.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                return cart;
        } catch (error) {
            console.log(error)
        }
    }

    async #getMaxId() {
        try {
            let maxId = 0;
            const carts = await this.getCarts();
            carts.map((cart) => {
                if(cart.id > maxId) maxId = cart.id;
            })
                return maxId;
        } catch (error) {
            console.log(error)
        }
    }

    async getCartsById(idCart){
        try {
            const carts = await this.getCarts();
            const cart =  carts.find((cart) => cart.id === idCart);
                return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const products = await productManager.getProducts();
            const carts = await this.getCarts();
            const cartSeleccionado = carts.find((cart) => cart.id === Number(idCart));
            const productSeleccionado = products.find((product) => product.id === Number(idProduct))
            
            const existingProduct = cartSeleccionado.products.find((product) => product.id === Number(idProduct));
            if(!existingProduct) {
                cartSeleccionado.products.push({ id: productSeleccionado.id, quantity: 1});
            } else {
                existingProduct.quantity++;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return carts;
        } catch (error) {
            
        }
    }
}

    export default CartManager;