const db = require("../models/index");
const likes = db.likes;

exports.likesPosts = (req, res, next) => {
  console.log("test get all posts");
  likes
    .findAll()
    .then((likes) => {
      console.log("je suis dans likes controller", likes);
      res.status(200).json(likes);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneLike = (req, res, next) => {
  likes
    .findByPk(req.params.id)
    .then((oneLike) => {
      res.status(200).json(oneLike);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
