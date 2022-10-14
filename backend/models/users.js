module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.INTEGER,
      // required: true,
      // allowNull: false,
      defaultValue: 0,
    },
  });

  return users;
};
