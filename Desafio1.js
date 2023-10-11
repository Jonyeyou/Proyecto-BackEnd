class ProductManager {
    
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock 
        }
        if (this.products.find((newProduct) => newProduct.code === product.code)) {
            console.log("Error, Este producto ya esta dentro del arreglo")
        }
        else {
            this.products.push(product)
        }
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        })
            return maxId;
    }

    getProductById(idProduct){
        const producto = this.products.find((product) => product.id === idProduct);
        if(producto) {
            return producto
        } else {
            console.log("Not found")
            }
    }
}
    const productManager = new ProductManager();

    console.log(productManager.getProducts());
    console.log(productManager.getProductById(1));
    productManager.addProduct('Producto prueba 1', 'este es el 1er producto de prueba', 199, "sin imagen", '1787', 7);

    console.log(productManager.getProducts());
    console.log(productManager.getProductById(1));


    productManager.addProduct('Producto prueba 2', 'este es el 2do producto de prueba', 150, "sin imagen", '1787', 10);