const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

//  Appel des routes
const db = require("./models");

// importation du routeur pour les posts
const postRoutes = require("./routes/post-routes");
// importation du routeur pour les users
const userRoutes = require("./routes/user-routes");
// importation du routeur pour les likes
const likesRoutes = require("./routes/like-routes");

// Accès au chemin de notre système de fichier
const path = require("path");

//app express
app.use(express.json());

//les middleware pour cors
app.use((req, res, net) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//route pour accéder aux images du dossier static image
app.use("/imagesPost", express.static(path.join(__dirname, "imagesPost")));
// route pour accéder aux images du dossier static /imagesUser
app.use("/imagesUser", express.static(path.join(__dirname, "imagesUser")));
//route générale pour les posts
app.use("/api/post", postRoutes);
//route générale pour l'authentification des users
app.use("/api/auth", userRoutes);
// On enregistre les routes pour les likes
app.use("/api/like", likesRoutes);

//route qu sécurise les headers
app.use(helmet());

module.exports = app;
