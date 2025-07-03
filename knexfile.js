const dotenv = require("dotenv").config()

console.log(process.env.MYSQL_PASSWORD);


module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.MYSQL_HOST,  
        port:process.env.MYSQL_PORT,    
        user: process.env.MYSQL_USER,           
        password: process.env.MYSQL_PASSWORD,  
        database: process.env.MYSQL_DATABASE
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  