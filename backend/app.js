const express = require("express");
const app = express();
const path = require("path");
const rateLimit = require("express-rate-limit");
//Helmet sécurise les requêtes HTTP
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

// Syncronisation avec la base de données avec sequelize
const db = require("./models/index");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Synchronisé avec la base de données !");
});
//PATH
// Créer un token d'identification
const jwt = require("jsonwebtoken");
//routes
const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");
const signUpRoutes = require("./routes/signUp-routes");
const commentsRoutes = require("./routes/comments-routes");
const likesRoutes = require("./routes/post-routes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, User-ID"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  //gestion du preflight, à recontrôler avant mise en production
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return next();
});

//equivalent de body-parser pour dialogue de express en Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//protection contre injections
app.use(mongoSanitize());

// chemin de l'API

//route pour accéder aux images du dossier static image
app.use("/pictures", express.static(path.join(__dirname, "pictures")));
//route pour l'enregistrement du profile
app.use("/api/signup", helmet(), signUpRoutes);
//route générale pour les posts
app.use("/api/post", helmet(), postRoutes);
//route générale pour l'authentification des users
app.use("/api/auth", helmet(), userRoutes);
//route pour les commentaires des users
app.use("/api/comment", helmet(), commentsRoutes);

//route qui sécurise les headers
app.use(helmet());

module.exports = app;
