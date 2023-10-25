import express from 'express';
import ProductManager from './ProductManager.js'

const app = express();

const productManager = new ProductManager();

const PORT = 8080;

app.get('/products', async (req, res)=> {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if(limit) {
            res.json(products.slice(0, parseInt(limit)));
        } else {
            res.json(products);
        }  
    } catch (error) {
    }
});

app.get('/products/:pid', async (req, res)=> {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(Number(pid));
        if(product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'No se encontro el producto que buscaba' })
        }
    } catch (error) {
    }
})


app.listen(PORT, ()=>console.log(`server ok on port ${PORT}`))