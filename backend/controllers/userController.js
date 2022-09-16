const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models/index");
const Profile = db.Users;

exports.getOneProfile = (req, res, next) => {
  console.log("username:" + req.params.userName);
  Profile.findOne({
    where: { username: req.params.userName },
    //include: ["posts"],
  })
    .then((oneProfile) => {
      res.status(200).json(oneProfile);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyProfile = (req, res, next) => {
  Profile.update(
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

exports.deleteProfile = (req, res, next) => {
  Profile.destroy({ where: { username: req.params.userName } })
    .then(() => res.status(200).json({ message: `Compte supprimé !` }))
    .catch((error) => res.status(400).json({ error }));
};
