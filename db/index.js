const { Pool, Client } = require('pg')

const pool = new Pool({
  "host": "localhost",
  "port":5432,
  "user":"Vernon",
  "password":"",
  "database":"ecommerce_project",
  "max":25,
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
  });
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
  deleteAddress
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

