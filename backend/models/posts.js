module.exports = (sequelize, Sequelize) => {
  const posts = sequelize.define("posts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    attachement: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      defaultValue: "",
    },
    author: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    title: {
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

  return posts;
};
