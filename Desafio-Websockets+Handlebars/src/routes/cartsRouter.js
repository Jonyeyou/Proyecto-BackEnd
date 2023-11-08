import { Router } from "express";
import CartsManager from "../manager/CartsManager.js";

const router = Router();
const cartsManager = new CartsManager();

router.post('/', async (req, res)=> {
    try {
        const cart = { ...req.body };
        const cartCreate = await cartsManager.addCart(cart);
        const { id } = cartCreate;
        const cartResponse = { 
            id,
            products: []
        }
        res.status(200).json(cartResponse);
    } catch (error) {
        
    }
})


router.get('/:cid', async (req, res)=> {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartsById(Number(cid));
        if(cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: 'No se encontro el producto que buscaba' })
        }
    } catch (error) {
        
    }
})

router.get('/', async (req, res)=> {
    const { limit } = req.query;
    try {
        const carts = await cartsManager.getCarts();
        if(limit) {
            res.json(carts.slice(0, parseInt(limit)));
        } else {
            res.json(carts);
        }  
    } catch (error) {
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {   
        const { cid, pid } = req.params;
        const cart = await cartsManager.addProductToCart(cid, pid);
        res.status(200).json(cart)
    } catch (error) {
        
    }
})

export default router;