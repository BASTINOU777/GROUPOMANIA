const { Sequelize } = require("sequelize");
// On importe le package de cryptage de mot de passe
//const bcrypt = require("bcrypt");
// Connexion à la base de données
const mysql = require("mysql2");

// la DB contiendra toutes mes fonctions
module.exports = db = {};

initialize();
//j'initialise
async function initialize() {
  const configOptions = {
    database: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "user",
    },
  };

  // création de la connection à mySQL
  await mysql.createConnection(configOptions);

  // connection de la DataBase à l' ORM
  const sequelize = new Sequelize(
    configOptions.database.database,
    configOptions.database.user,
    configOptions.database.password,
    {
      dialect: "mysql",
    }
  );

  // j'initialise mon model user et l' ajouter à l’objet db exporté
  db.User = require("../app/models/user.model")(sequelize);

  // synchronise tous les modèles avec la base de données
  await sequelize.sync({ alter: true });
  // création d'un user
  const jane = await User.create({ name: "Jane", lastName: "Doe" });
}
