module.exports = (sequelize, Sequelize) => {
  const likes = sequelize.define("likes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    users_liked: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  return likes;
};
