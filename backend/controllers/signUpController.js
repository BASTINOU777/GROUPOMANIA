const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.signUp = (req, res, next) => {
  if (req.body.password.length < 8 || req.body.password.length > 30) {
    return res.status(400).json({
      message: "Votre mot de passe doit contenir de 8 à 30 caractères",
    });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        admin: 0,
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
      };
      User.create(user)
        .then((data) =>
          res.status(201).json({ message: "Utilisateur créé !", data })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((myUser) => {
      if (!myUser) {
        return res
          .status(401)
          .json({ message: "Mauvaise adresse mail ou mot de passe" });
      }

      bcrypt
        .compare(req.body.password, myUser.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: `Mauvais mot de passe ou d'adresse mail` });
          }
          res.status(200).json({
            message: "Utilisateur connecté !",
            user: {
              userName: myUser.userName,
              email: myUser.email,
            },

            token: jwt.sign(
              {
                userId: myUser.profileId,
                admin: myUser.admin,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "3600s" }
            ),
          });
        })
        //tests pour le front
        .catch((error) =>
          res
            .status(500)
            .json("erreur1 depuis routesController.js :" + { error })
        );
    })
    .catch((error) =>
      res.status(500).json("erreur2 depuis routesController.js :" + { error })
    );
};

exports.checkPermissions = (req, res, next) => {
  res.status(200).json({
    message: "Permission en cous de vérification",
    profileId: res.locals.userId,
    admin: res.locals.admin,
  });
};
