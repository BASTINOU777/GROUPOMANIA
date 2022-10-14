const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// Middleware pour l'enregistrement de nouvels utilisateurs
exports.signUp = (req, res, next) => {
  console.log("Body : ", req.body);
  const password = req.body.password;
  if (password.length < 8 || password.length > 30) {
    return res.status(400).json({
      message: "Votre mot de passe doit contenir de 8 à 30 caractères",
    });
  }

  bcrypt.hash(password, 10).then((hash) => {
    const users = {
      admin: 0,
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      is_admin: 0,
    };
    console.log(users);
    // console.log("=>", id);
    // console.log("=>", username);

    User.create(users)
      .then((data) => {
        console.log(data);
        res.status(201).json({ message: "Utilisateur créé !", data });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          message: "Utilisateur non créé erreur de controller signup!",
          error,
        });
      });
  });
};
// Middleware pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
  console.log("=====>>", req.body);
  User.findOne({ where: { email: req.body.email } }).then((users) => {
    bcrypt
      //on le compare à celui dans le body
      .compare(req.body.password, users.password)
      .then((valid) => {
        // Si l'utilisateur entre le mauvais mot de passe retourne une erreur
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        } else {
          // si good je lui renvoie le bon user
          console.log(users.username);
          res.status(200).json({
            user_id: users.id,
            username: users.username,
            is_admin: users.is_admin,
            email: users.email,
            // On encode le userId pour que seul l'utilisateur qui a publié un post puisse la modifier ou supprimer
            token: jwt.sign(
              { user_id: users.id },
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
    user_id: res.locals.user_id,
    admin: res.locals.is_admin,
  });
};
