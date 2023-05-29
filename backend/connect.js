require('dotenv').config();
let mysql = require('mysql2');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'mysql_db',
  user: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: "todo_app",
});

// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });
  
  module.exports = connection;