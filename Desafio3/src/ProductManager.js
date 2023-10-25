import fs from 'fs';

class ProductManager {
    
    constructor() {
        this.path = './products.json'
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
    
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            const product = {
                id: await this.#getMaxId() + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            if (products.find((newProduct) => newProduct.code === product.code)) {
                console.log("Error, Este producto ya esta dentro del arreglo")
            }
            else {
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
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
    const productManager = new ProductManager();

    const test = async() => {
        await productManager.addProduct('Producto 1', 'este es el 1 producto', 400, "sin imagen", '1787', 7);
        await productManager.addProduct('Producto 2', 'este es el 2 producto', 900, "sin imagen", '1234', 50);
        await productManager.addProduct('Producto 3', 'este es el 3 producto', 399, "sin imagen", '1678', 23);
        await productManager.addProduct('Producto 4', 'este es el 4 producto', 2600, "sin imagen", '1954', 45);
        await productManager.addProduct('Producto 5', 'este es el 5 producto', 3500, "sin imagen", '1546', 3);
        await productManager.addProduct('Producto 6', 'este es el 6 producto', 200, "sin imagen", '1067', 28);
        await productManager.addProduct('Producto 7', 'este es el 7 producto', 11500, "sin imagen", '5639', 48);
        await productManager.addProduct('Producto 8', 'este es el 8 producto', 150, "sin imagen", '0945', 72);
        await productManager.addProduct('Producto 9', 'este es el 9 producto', 370, "sin imagen", '2756', 17);
        await productManager.addProduct('Producto 10', 'este es el 10 producto', 420, "sin imagen", '9384', 32);
    }

    test();

    export default ProductManager;