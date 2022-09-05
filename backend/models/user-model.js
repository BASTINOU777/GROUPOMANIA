const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // Change le mot de passe par défaut
      attributes: { change: ["passwordHash"] },
    },
    scopes: {
      // Je défini le hash dans le champ
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}
