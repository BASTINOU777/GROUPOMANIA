const mysql = require("mysql2");

// création de la connexion à la Data Base
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});
