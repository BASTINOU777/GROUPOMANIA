const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // créer une base de données si elle n’existe pas déjà
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connection à la base de données
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // initialisation du models et les ajouter à l’objet db exporté
  db.User = require("../models/user-model")(sequelize);

  // sync tous les models à la db
  await sequelize.sync({ alter: true });
}
