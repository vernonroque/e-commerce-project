const express = require('express');
const registerRouter = express.Router();
const bodyParser = require('body-parser');

registerRouter.use(bodyParser.json());

const {
    registerCustomer

} = require('../db/index');

registerRouter.post('/customers/register', (res,req,next) => {

    let {first_name,last_name,email_address,password} = req.body;

    console.log('customer info',{
        first_name,
        last_name,
        email_address,
        password
    });

    const errors = [];

    if(!first_name || !last_name || !email_address || !password)
        errors.push({message:"Please enter all fields"});


})




module.exports = registerRouter;