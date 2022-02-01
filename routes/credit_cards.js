const express = require('express');
const cardRouter = express.Router();
const bodyParser = require('body-parser');

cardRouter.use(bodyParser.json());

const {
    getCreditCards,
    getCreditCardsById,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard
} = require('../db/index');

cardRouter.get('/', (req,res,next) => {
    const allCreditCards = getCreditCards();
        if(allCreditCards)
            res.status(200).send(allCreditCards);
        else 
            res.status(404).send();
});

cardRouter.get('/:customer_id', (req,res,next) =>{
    const cardId = req.params.customer_id;
    getCreditCardsById(cardId);
        if(cardId)
            res.status(200).send(cardId);
        else
            res.status(404).send();
});

cardRouter.post('/', (req,res,next) => {
    const newCardInfo = req.body;
    const newCreditCard = createCreditCard(newCardInfo);
        if(newCreditCard)
            res.status(201).send(newCreditCard);
        else
            res.status(404).send();
});

cardRouter.put('/:id', (req,res,next) => {
    const updateCardInfo = req.body;
    const updatedCard = updateCreditCard(updateCardInfo);
    if(updatedCard)
        res.status(200).send(updatedCard);
    else
        res.status(404).send();
});

cardRouter.delete('/:id', (req,res,next)=> {
    const cardId = req.params.id;
    const deletedCreditCard = deleteCreditCard(cardId);
        if(deletedCreditCard)
            res.status(204).send(deletedCreditCard);
        else
            res.status(404).send();
});

module.exports = cardRouter;