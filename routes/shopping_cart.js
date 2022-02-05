const express = require('express');
const shopCartRouter = express.Router();
const bodyParser = require('body-parser');

shopCartRouter.use(bodyParser.json());

const {
    

} = require('../db/index')


module.exports = shopCartRouter;