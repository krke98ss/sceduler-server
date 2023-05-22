const mysql = require("mysql");


const DB_INSTANCE = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
})

DB_INSTANCE.connect;


module.exports = DB_INSTANCE;