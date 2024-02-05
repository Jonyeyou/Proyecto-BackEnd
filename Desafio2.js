const fs = require('fs');

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
            if(producto) {
                return producto
            } else {
                console.log("Not found")
                }
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
        console.log('primer consulta', await productManager.getProducts());
        await productManager.addProduct('Producto 1', 'este es el 1er producto', 199, "sin imagen", '1787', 7);
        console.log('segunda consulta', await productManager.getProducts());
        await productManager.addProduct('Producto 2', 'este es el 2do producto', 150, "sin imagen", '1787', 10);
        console.log('tercer consulta', await productManager.getProducts());
        await productManager.addProduct('Producto 3', 'este es el 3er producto', 147, "sin imagen", '1945', 23);
        console.log('cuarta consulta', await productManager.getProducts());
        console.log('primer consulta por id', await productManager.getProductById(1));
        console.log('segunda consulta por id', await productManager.getProductById(2));
        console.log('tercer consulta por id', await productManager.getProductById(3));
        await productManager.updateProduct(1, {
            title: 'Prueba de update producto',
            description: 'descripcion actualizada',
            price: 299,
            thumbnail: 'sin imagen',
            code: '1425',
            stock: 3
        })
        console.log('consulta de update', await productManager.getProducts());
        await productManager.updateProduct(4, {
            title: 'Prueba de update producto 2',
            description: 'descripcion actualizada',
            price: 569,
            thumbnail: 'sin imagen',
            code: '2865',
            stock: 10
        })
        await productManager.deleteProduct(1);
        console.log('consultada de eliminado', await productManager.getProducts())
    }

    test();