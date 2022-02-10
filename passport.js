const passport = require('passport');
const LocalStrategy = require('passport-local');
const { pool } = require('./db/index');

function initialize(passport){
    const authenticateUser = (email,password,done) => {
        pool.query('SELECT * FROM customers WHERE email =$1',
        [email],
        (error,results) => {
            if(error)
                throw error;
            else
            console.log(results.rows);

        if(!results.rows.length){
            
        }
        })


        


    }


} 