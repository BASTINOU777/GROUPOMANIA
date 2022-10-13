module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    // dislikes: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: 0,
    // },
    userLiked: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    // userDisliked: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: 0,
    // },
  });

  return Post;
};
