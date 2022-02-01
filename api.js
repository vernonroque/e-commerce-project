const express = require('express');
// const app = require('../server');
const apiRouter = express.Router();

//The code below mounts customersRouter to a path
const customersRouter = require('./routes/customers');
apiRouter.use('/customers',customersRouter);

const addressRouter = require('./routes/billing_address');
apiRouter.use('/billing_address', addressRouter);

const cardRouter = require('./routes/credit_cards');
apiRouter.use('/credit_cards',cardRouter);




// const ideasRouter = require('./ideas');
// apiRouter.use('/ideas',ideasRouter);

// const meetingsRouter = require('./meetings.js');
// apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;