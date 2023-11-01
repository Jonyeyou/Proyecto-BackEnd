import { Router } from "express";
import ProductManager from "../manager/ProductManager.js"

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res)=> {
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

router.get('/:pid', async (req, res)=> {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if(product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'No se encontro el producto que buscaba' })
        }
    } catch (error) {
    }
})

router.post('/', async (req, res) => {
    try {
        const product = { ...req.body };
        const productCreate = await productManager.addProduct(product);
        const { id, title, description, code, price, status=true, stock, category, thumbnails=[] } = productCreate;
        const productResponse = { 
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails 
        }
        res.status(200).json(productResponse);
    } catch (error) {
    }
})

router.put('/:pid', async (req, res)=> {
    try {
        const product = { ...req.body };
        const { pid } = req.params;
        const productId = Number(pid)
        const productOk = await productManager.getProductById(productId);
        if(!productOk) res.status(404).json({ error: 'No se encontro el producto que buscaba'})
        else 
        await productManager.updateProduct(productId, product)
        res.status(200).json({ message: 'Producto seleccionado actualizado' })
    } catch (error) {
        
    }
})

router.delete('/:pid', async (req, res)=> {
    try {
        const { pid } = req.params;
        const productId = Number(pid);
        await productManager.deleteProduct(productId);
        res.json({ message: 'Producto seleccionado eliminado con exito' })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

export default router;