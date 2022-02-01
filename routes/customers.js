const express = require('express');
const customersRouter = express.Router();
const bodyParser = require('body-parser');

customersRouter.use(bodyParser.json());

const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../db/index');

customersRouter.get('/', (req,res,next) => {
    const allCustomers = getCustomers();
    console.log('all addresses', allCustomers);
    res.status(200).send(allCustomers);
  });

customersRouter.get('/:customerId', (req,res,next) => {
    const selectedCustomer = req.params.customerId;
    getCustomerById(selectedCustomer);
    if(selectedCustomer){
      res.status(200).send(selectedCustomer);
    }
    else{
      res.status(404).send();
    }
  });

customersRouter.post('/', (req,res,next) => {
    const newCustomer = req.body;
    const addedNewCustomer = createCustomer(newCustomer);
      if(addedNewCustomer){
        res.status(201).send(addedNewCustomer);
      }
      else{
        res.status(404).send();
      }
  });

  customersRouter.put('/:customerId', (req,res,next) => {
    const newCustomerData = req.body;
    const updatedCustomer = updateCustomer(newCustomerData);
      if(updatedCustomer){
        res.status(200).send(updatedCustomer);
      }
      else{
        res.status(404).send();
      }
  });

  customersRouter.delete('/:customerId', (req,res,next) => {
    const customerId = req.params.customerId;
    const deletedCustomerId = deleteCustomer(customerId);
    if(deletedCustomerId){
      res.status(204).send(deletedCustomerId);
    }
    else{
      res.status(404).send();
    }
  });



// app.use('/users', router);

//   router.get('/:userId', async (req, res, next) => {

//     try {
//       const { userId } = req.params;
    
//       const response = await UserServiceInstance.get({ id: userId });
//       res.status(200).send(response);
//     } catch(err) {
//       next(err);
//     }
//   });
module.exports = customersRouter;

