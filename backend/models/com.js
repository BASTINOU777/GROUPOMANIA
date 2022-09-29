module.exports = (sequelize, Sequelize) => {
  const Com = sequelize.define("Com", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      required: true,
      allowNull: false,
    },
  });

  return Com;
};
