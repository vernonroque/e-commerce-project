const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const db = require('./db/index');

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./api');
app.use('/api',apiRouter);

app.get('/customers', db.getCustomers)
app.get('/customers/:id', db.getCustomerById)
app.post('/customers', db.createCustomer)
app.put('/customers/:id', db.updateCustomer)
app.delete('/customers/:id', db.deleteCustomer)

app.get('/billing_address', db.getAddresses)
app.get('/billing_address/:id', db.getAddressById)
app.post('/billing_address', db.createAddress)
app.put('/billing_address/:id', db.updateAddress)
app.delete('/billing_address/:id', db.deleteAddress)

app.get('/credit_cards', db.getCreditCards)
app.get('/credit_cards/:id',db.getCreditCardsById)
app.post('/credit_cards', db.createCreditCard)
app.put('/credit_cards/:id', db.updateCreditCard)
app.delete('/credit_cards/:id',db.deleteCreditCard)

app.get('/items', db.getItems)
app.get('/items/:id', db.getItemById)
app.post('/items', db.createItem)
app.put('/items/:id',db.updateItem)
app.delete('/items/:id',db.deleteItem)

app.get('/orders',db.getOrders)
app.get('/orders/:id',db.getOrderById)
app.post('/orders',db.createOrder)
app.put('/orders/:id',db.updateOrder)
app.delete('/orders/:id',db.deleteOrder)

app.get('/shopping_cart', db.getShopCart)
app.get('/shopping_cart/:id', db.getShopCartById)
app.post('/shopping_cart',db.createShopCart)
app.put('/shopping_cart/:id',db.updateShopCart)
app.delete('/shopping_cart/:id',db.deleteShopCart)



app.get('/', (req, res) => {
  res.send('Andre 3000!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})