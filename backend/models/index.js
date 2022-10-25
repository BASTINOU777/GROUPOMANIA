const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.posts = require("./posts")(sequelize, Sequelize);
db.likes = require("./likes")(sequelize, Sequelize);

db.posts.hasMany(db.posts);
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
module.exports = db;
