const express = require('express');
const addressRouter = express.Router();
const bodyParser = require('body-parser');

addressRouter.use(bodyParser.json());

const {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../db/index');

addressRouter.get('/billing_address', (req,res,next) => {
    const allAddresses = getAddresses();
    console.log('all addresses', allAddresses);
    res.status(200).send(allAddresses);
}); 

addressRouter.get('/:customerId', (req,res,next) => {
    const selectedAddress = req.params.customerId;
    getAddressById(selectedAddress);
    if(selectedAddress){
      res.status(200).send(selectedAddress);
    }
    else{
      res.status(404).send();
    }
});

addressRouter.post('/', (req,res,next) => {
  const newAddress = req.body;
  const createdNewAddress = createAddress(newAddress);
    if(createdNewAddress){
      res.status(200).send(createdNewAddress);
    }
    else{
      res.status(404).send();
    }
});

addressRouter.put('/:id', (req,res,next) => {
  const newAddressData = req.body;
  const updatedAddressData = updateAddress(newAddressData);
    if(updatedAddressData){
      res.status(200).send(updatedAddressData);
    }
    else{
      res.status(404).send();
    }
});

addressRouter.delete('/:id', (req,res,next) => {
  const addressId = req.params.id;
  const deletedAddressId = deleteAddress(addressId); 
    if(deletedAddressId){
      res.status(204).send(deletedAddressId);
    }
    else{
      res.status(404).send();
    }
});

module.exports = addressRouter;