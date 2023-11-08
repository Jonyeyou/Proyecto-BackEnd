import express from 'express';
import productRouter from './routes/productsRouter.js ';
import cartsRouter from './routes/cartsRouter.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import handlerbars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.engine('handlerbars', handlerbars.engine());
app.set('view engine', 'handlerbars');
app.set('views', __dirname + '/views')

app.get('/websocket', (req, res)=> {
    res.render('websocket')
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)

const PORT = 8080;

const httpServer = app.listen(PORT, ()=>console.log(`server ok on port ${PORT}`))

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=> {
    console.log('Usuario conectado');
})
