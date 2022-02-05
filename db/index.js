const { Pool, Client } = require('pg')

const pool = new Pool({
  "host": "localhost",
  "port":5432,
  "user":"Vernon",
  "password":"",
  "database":"ecommerce_project",
  "max":30,
  "connectionTimeoutMillis": 0,
  "idleTimeoutMillis":0

})

// pool.query(`Select * from billing_address`,(err,res) => {

//   if(!err){
//     console.log(res.rows)
//   }
//   else{
//     console.log(err.message)
//   }
// });

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createCustomer = (request, response) => {
  const {first_name, last_name, email_address, password } = request.body
  pool.query('INSERT INTO customers (first_name,last_name,email_address,password) VALUES ($1,$2, $3, $4)', 
  [first_name,last_name,email_address,password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Customer added with name: ${first_name}`)
  })
}

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id)
  const {first_name,last_name, email_address,password } = request.body
  pool.query(
    `UPDATE customers SET first_name = $2, last_name = $3, email_address = $4, password = $5 WHERE id = $1`,
    [id,first_name,last_name,email_address,password],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Customer modified with ID: ${id}`)
    }
  )
}

const deleteCustomer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Customer deleted with ID: ${id}`)
  })
}

const getAddresses = (request, response) => {
  pool.query('SELECT * FROM billing_address ORDER BY customer_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getAddressById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM billing_address WHERE customer_id = $1',[id], 
  (error,results) =>{
    if(error){
      throw error;
    }
    else
      response.status(200).json(results.rows);
  })
}

const createAddress = (request,response) => {
  const {customer_id,country,street_name,city,state_department,zipcode} = request.body;
  pool.query('INSERT INTO billing_address (customer_id,country,street_name,city,state_department,zipcode) VALUES($1,$2,$3,$4,$5,$6)',
  [customer_id,country,street_name,city,state_department,zipcode], (error,result) =>{
      if(error){
        throw(error);
      }
      else
      response.status(201).send('address created with customer_id: ' + customer_id);
     })
};

const updateAddress = (request, response) => {
  const id = parseInt(request.params.id)
  const {customer_id,country,street_name,city,state_department,zipcode } = request.body
  pool.query(
    `UPDATE billing_address SET customer_id = $2, country = $3, street_name = $4, city = $5, state_department = $6, zipcode = $7 WHERE id = $1`,
    [id,customer_id,country,street_name,city,state_department,zipcode],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Address modified with ID: ${id}`)
    }
  )
};

const deleteAddress = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE from billing_address WHERE id =$1', [id], (error,results) => {
      if(error){
        throw error;
      }
      else{
        response.status(200).send(`address deleted with id: ${id}`);
      }
  })
};

const getCreditCards = (request,response) => {
  pool.query('SELECT * from credit_cards ORDER BY id ASC', (error,results) =>{
    if(error)
      throw error
    else 
      response.status(200).json(results.rows);
  })
};

const getCreditCardsById = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * from credit_cards WHERE id =$1', [id], (error,results)=>{
    if(error)
      throw error
    else
      response.status(200).json(results.rows);
  })
};

const createCreditCard = (request,response) => {
  const {customer_id,card_number,card_type,cvc_number,expiration_date} = request.body;
  pool.query('INSERT INTO credit_cards (customer_id,card_number,card_type,cvc_number,expiration_date) VALUES ($1,$2,$3,$4,$5)',
  [customer_id,card_number,card_type,cvc_number,expiration_date], (error,results) => {
    if(error)
      throw error
    else
      response.status(201).send('credit card created for customer id: ' + customer_id);
  })
};

const updateCreditCard = (request,response) => {
  const id = parseInt(request.params.id);
  const {customer_id,card_number,card_type,cvc_number,expiration_date} = request.body;
  pool.query('UPDATE credit_cards SET customer_id = $2, card_number = $3, card_type = $4, cvc_number = $5,expiration_date = $6 WHERE id = $1',
  [id,customer_id,card_number,card_type,cvc_number,expiration_date], (error,results)=> {
    if (error)
      throw error
    else
      response.status(200).send('credit card updated with id: ' + id);
  })
}

const deleteCreditCard = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM credit_cards WHERE id = $1',[id], (error,results) =>{
    if(error){
      throw error
    }
    else
      response.status(200).send('credit card deleted with id: ' + id);
  })
};

const getItems = (request,response) => {
  pool.query('SELECT * FROM items', (error,results) => {
    if(error)
      throw error
    else
      response.status(200).json(results.rows);
  })
};

const getItemById = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM items WHERE id = $1', [id], (error,results) =>{
    if(error)
      throw error
    else
      response.status(200).json(results.rows);
  })
};

const createItem = (request,response) => {
  const{item_name,base_price,manufacturer,description} = request.body
  pool.query('INSERT into items (item_name,base_price,manufacturer,description) VALUES($1,$2,$3,$4)',
  [item_name,base_price,manufacturer,description], (error,results) =>{
    if(error)
      throw error
    else
      response.status(200).send(`item created with item name ${item_name}`);
  })
};

const updateItem =(request,response) =>{
  const id = parseInt(request.params.id);
  const{item_name,base_price,manufacturer,description} = request.body;
  pool.query('UPDATE items SET item_name = $2, base_price = $3, manufacturer = $4, description = $5 WHERE id = $1', 
  [id,item_name,base_price,manufacturer,description], (error,results) => {
    if(error)
      throw error;
    else
      response.status(200).send(`updated item with item id: ${id}`);
  })
};

const deleteItem = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM items WHERE id = $1',[id], (error,results) =>{
    if(error)
      throw error
    else
      response.status(200).send('item deleted with id: ' + id);

  })
};

const getOrders = (request,response) => {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error,results) => {
    if(error)
      throw error
    else
      response.status(200).json(results.rows)
  })
};

const getOrderById = (request,response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM orders WHERE id =$1', [id], (error,results) => {
    if(error)
      throw error;
    else
      response.status(200).json(results.rows)
  })
};

const createOrder = (request,response)=> {
  const {customer_id,order_date,ship_date} = request.body;
  pool.query('INSERT into orders (customer_id,order_date,ship_date) VALUES($1,$2,$3)',
  [customer_id,order_date,ship_date], (error,results) => {
    if(error)
      throw error;
    else
      response.status(200).send(`order created for customer with id: ${customer_id} `);
  })
};

const updateOrder = (request,response) => {
  const id = parseInt(request.params.id);
  const {customer_id,order_date,ship_date} = request.body;
  pool.query('UPDATE orders SET customer_id = $2, order_date = $3, ship_date = $4 WHERE id =$1',
  [id,customer_id,order_date,ship_date], (error,results) => {
    if(error)
      throw error;
    else
      response.status(200).send(`order updated with id: ${id}`);
  })
};

const deleteOrder = (request,response) => {
const id = parseInt(request.params.id);
pool.query('DELETE FROM orders WHERE id = $1',[id],(error,results)=>{
  if(error)
    throw error;
  else
    response.status(200).send(`order deleted with id: ${id}`);
  })
};

const getShopCart = (request,response) => {
  pool.query('SELECT * FROM shopping_cart',(error,results) => {
    if(error)
      throw error;
    else
      response.status(200).json(results.rows);
  })
};

const getShopCartById = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM shopping_cart WHERE order_id = $1', [id], (error,results) =>{
    if (error)
      throw error;
    else
      response.status(200).json(results.rows);
  })
};

const createShopCart = (request,response) => {
  const {order_id,item_id,quantity} = request.body;
  pool.query('INSERT into shopping_cart (order_id,item_id,quantity) VALUES($1,$2,$3)',
  [order_id,item_id,quantity],(error,results)=>{
    if(error)
      throw error;
    else
      response.status(200).send(`shopping cart created with order id: ${order_id}`)
  })
}

const updateShopCart = (request,response) => {
const id = parseInt(request.params.id)
const {order_id,item_id,quantity} = request.body
pool.query(`UPDATE shopping_cart SET item_id=$2,quantity=$3 WHERE order_id = ${id}`,
[order_id,item_id,quantity],(error,results) => {
  if (error)
   throw error;
  else
    response.status(200).send('updated order with id: ' + order_id);
  })
}
const deleteShopCart = (request,response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM shopping_cart WHERE order_id =$1',[id],(error,results) => {
    if(error)
      throw error
    else
    response.status(200).send('order deleted with id: ' + id);
  })
}


module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  getCreditCards,
  getCreditCardsById,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getShopCart,
  getShopCartById,
  createShopCart,
  updateShopCart,
  deleteShopCart
}

//connecting with client
// const client = new Client({
//   "host": "localhost",
//   "port":5432,
//   "user":"postgres",
//   "password":"postgres",
//   "database":"ecommerce_project"
// })

// client.connect();

// client.query(`Select * from customers`,(err,res) => {

//   if(!err){
//     console.log(res.rows)
//   }
//   else{
//     console.log(err.message)
//   }
//   client.end;
// })

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   },
// }

