import fs from 'fs';

class ProductManager {
    
    constructor() {
        this.path = './src/data/products.json'
    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)) {
                const userJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(userJSON)
            } else return [];
        } catch (error) {
            console.log(error)
        }
    }
    
    async addProduct(obj) {
        try {
            const products = await this.getProducts();
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj,
            }
            if (products.find((newProduct) => newProduct.code === product.code)) {
                console.log("Error, Este producto ya esta dentro del arreglo")
            }
            else {
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return product;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async #getMaxId() {
        try {
            let maxId = 0;
            const products = await this.getProducts();
            products.map((product) => {
                if(product.id > maxId) maxId = product.id;
            })
                return maxId;
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(idProduct){
        try {
            const products = await this.getProducts();
            const producto =  products.find((product) => product.id === idProduct);
                return producto
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, updateData) {
        try {
            console.log(updateData);
            const products = await this.getProducts();
            const productoIndex =  products.findIndex((product) => product.id === id);
            if (productoIndex !== -1){
                products[productoIndex] = {id, ...updateData};
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log("Se actualizo correctamente el producto.");
            } else {
                console.log("Producto no encontrado.")
            }
        } catch (error) {
            console.log("Error al actualizar el producto:", error)
        }
    }

    async deleteProduct (id) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((product) => product.id === id);
            if (productIndex === -1){
                console.log('Se elimino el producto con exito')
            }
            products.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error)
        }
    }
}

    export default ProductManager;