const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
// Middleware pour l'enregistrement de nouvels utilisateurs
exports.signUp = (req, res, next) => {
  const password = req.body.password;
  if (password.length < 8 || password.length > 30) {
    return res.status(400).json({
      message: "Votre mot de passe doit contenir de 8 à 30 caractères",
    });
  }

  bcrypt.hash(password, 10).then((hash) => {
    const user = {
      admin: 0,
      id: req.body.id,
      username: req.body.userName,
      email: req.body.email,
      password: hash,
      isAdmin: 0,
    };
    console.log(user);

    User.create(user)
      .then((data) =>
        res.status(201).json({ message: "Utilisateur créé !", data })
      )
      .catch((error) =>
        res.status(400).json({
          message: "Utilisateur non créé erreur de controller signup!",
          error,
        })
      );
  });
};
// Middleware pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    bcrypt
      //on le compare à celui dans le body
      .compare(req.body.password, user.password)
      .then((valid) => {
        // Si l'utilisateur entre le mauvais mot de passe retourne une erreur
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        } else {
          // si good je lui renvoie le bon user
          console.log(user.username);
          res.status(200).json({
            userId: user.id,
            userName: user.username,
            email: user.email,
            // On encode le userId pour que seul l'utilisateur qui a publié un post puisse la modifier ou supprimer
            token: jwt.sign(
              { userId: user.id },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        }
      })
      .catch((error) =>
        res.status(500).json({ error: "erreur de service Login" })
      );
  });
};

exports.checkPermissions = (req, res, next) => {
  res.status(200).json({
    message: "Permission en cous de vérification",
    userId: res.locals.userId,
    admin: res.locals.isAdmin,
  });
};
