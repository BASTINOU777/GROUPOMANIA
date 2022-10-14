const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.users;

exports.getOneUser = (req, res, next) => {
  console.log("username:" + req.params.username);
  User.findOne({
    where: { username: req.params.username },
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
  console.log(req.params.username);
  console.log(req.body.data.newEmail);
  User.update(
    {
      username: req.body.data.newUsername,
      email: req.body.data.newEmail,
    },
    { where: { username: req.params.username } }
  )
    .then((users) =>
      res.status(200).json({
        message: `Objet modifié !`,
        users,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.destroy({ where: { username: req.params.username } })
    .then(() => res.status(200).json({ message: `Compte supprimé !` }))
    .catch((error) => res.status(400).json({ error }));
};
