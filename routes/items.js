const express = require('express');
const itemsRouter = express.Router();
const bodyParser = require('body-parser');

itemsRouter.use(bodyParser.json());

const{
    getItems, 
    getItemById,
    createItem,
    updateItem,
    deleteItem
} = require('../db/index');

itemsRouter.get('/', (res,req,next) => {
    const allItems = getItems();
    if(allItems)
        res.status(200).send(allItems);
    else
        res.status(404).send();
});

itemsRouter.get('/:id', (res,req,next) => {
    const itemId = req.params.id;
    getItemById(itemId);
    if(itemId)
        res.status(200).send(itemId);
    else
        res.status(404).send();
});

itemsRouter.post('/', (res,req,next) => {
    const newItemInfo = req.body;
    const newItem = createItem(newItemInfo);
    if (newItem)
        res.status(200).send(newItem);
    else
        res.status(404).send();
});

itemsRouter.put('/:id', (res,req,next) => {
    const newItemData = req.body; 
    const updatedItem = updateItem(newItemData);
    if(updatedItem)
        res.status(200).send(updatedItem);
    else
        res.status(404).send();
})

itemsRouter.delete('/:id', (res,req,next) => {
    const id = req.params.id
    const deletedItem = deleteItem(id);
    if(deletedItem)
        res.status(200).send(deletedItem);
    else
        res.status(404).send();

})

module.exports = itemsRouter;






