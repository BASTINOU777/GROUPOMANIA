const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.users;

exports.getOneUser = (req, res, next) => {
  console.log("username:" + req.params.userName);
  User.findOne({
    where: { username: req.params.userName },
    include: ["posts"],
  })
    .then((oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyUser = (req, res, next) => {
  User.update(
    {
      username: req.body.user.userName,
      email: req.body.user.email,
    },
    { where: { username: req.body.user.lastPseudo } }
  )
    .then(() =>
      res.status(200).json({
        message: `Objet modifié !`,
        ...req.body.user,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.destroy({ where: { username: req.params.userName } })
    .then(() => res.status(200).json({ message: `Compte supprimé !` }))
    .catch((error) => res.status(400).json({ error }));
};
