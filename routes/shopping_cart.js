const express = require('express');
const shopCartRouter = express.Router();
const bodyParser = require('body-parser');

shopCartRouter.use(bodyParser.json());

const {
    getShopCart,
    getShopCartById,
    createShopCart,
    updateShopCart,
    deleteShopCart

} = require('../db/index')

shopCartRouter.get('/', (res,req,next) => {
    const allShopCartItems = getShopCart();
    if(allShopCartItems)
        res.status(200).send(allShopCartItems);
    else
        res.status(404).send();

});

shopCartRouter.get('/:id', (res,req,next) => {
    const shopCartId = req.params.id;
    const selectedShopCart = getShopCartById(shopCartId)
    if(selectedShopCart)
        res.status(200).send(selectedShopCart);
    else
        res.status(404).send();
})

shopCartRouter.post('/', (res,req,next) => {
    const newCartData = req.body;
    const createdCart = createShopCart(newCartData);
        if(createdCart)
            res.status(200).send(createdCart);
        else
            res.status(404).send();
})

shopCartRouter.put('/:id', (res,req,next) => {
    const id = req.params.id;
    const newShopCartData = updateShopCart(id);
        if(newShopCartData)
            res.status(200).send(newShopCartData);
        else
            res.status(404).send();
})

shopCartRouter.delete('/:id', (res,req,next)=>{
    const id = req.params.id;
    const deletedShopCart = deleteShopCart(id);
        if(deletedShopCart)
            res.status(200).send();
        else
            res.statusCode(404).send();
})


module.exports = shopCartRouter;