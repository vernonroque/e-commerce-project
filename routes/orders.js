const express = require('express');
const orderRouter = express.Router();
const bodyParser = require('body-parser');

orderRouter.use(bodyParser.json());

const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder

} = require('../db/index');

orderRouter.get('/',(res,req,next) => {
    const  allOrders = getOrders();
    if(allOrders)
        res.status(200).send(allOrders)
    else
        res.status(404).send();
        
});

orderRouter.get('/:id', (res,req,next) => {
    // const id = req.params.id;
    const selectedOrder = getOrderById();
    if(selectedOrder)
        res.status(200).send(selectedOrder);
    else
        res.status(404).send();
});

orderRouter.post('/', (res,req,next) => {
    const newOrder = req.body;
    const createdOrder = createOrder(newOrder);
    if(createdOrder)
        res.status(200).send(createdOrder);
    else
        res.status(404).send();
});

orderRouter.put('/:id', (res,req,next) => {
    const newOrderData = req.body;
    const updatedOrder = updateOrder(newOrderData);
        if(updatedOrder)
            res.status(200).send(updatedOrder);
        else
            res.status(404).send();
});

orderRouter.delete('/:id', (res,req,next) => {
    const deletedOrder = deleteOrder();
        if(deletedOrder)
            res.status(200).send(deletedOrder);
        else
            res.status(404).send();
})

module.exports = orderRouter;

