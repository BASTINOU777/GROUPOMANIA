/*const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        mobile: { type: DataTypes.STRING, allowNull: false }
    };

    return sequelize.define("User", attributes);
}*/

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
  
      firstName: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
  
      lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
  
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
  
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Utilisation d'un regex pour le format d'adresse mail
        },
      },
  
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
  
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
  
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return User;
  };