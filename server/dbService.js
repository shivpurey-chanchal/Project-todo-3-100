const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "demo",
  port: "3306",
});
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(connection.state, "....this is connection!!!");
});

module.exports = connection;
