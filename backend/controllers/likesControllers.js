// Connexion à la base de données
const db = require("../models");

exports.getLike = (req, res, next) => {
  const query = `SELECT * FROM postLike WHERE postLike.postId = ${req.params.id}`;
  db.query(query, (error, results) => {
    if (!results) {
      res.json({ status: "dans le GetLike!" });
    } else {
      res.json(results);
    }
  });
};

exports.like = (req, res, next) => {
  const postLikeData = {
    userId: req.auth.userId,
    postId: req.body.postId,
  };

  const query = `INSERT INTO postLike VALUES (?, ?)`;

  db.query(query, Object.values(postLikeData), (error) => {
    if (error) {
      res.json({
        status: "like: je ne peux pas liké",
        reason: error.code,
        reason2: error,
      });
    } else {
      res.json({
        status: "Like: le post est liké",
        postLikeData: postLikeData
      });
    }
  });
};

exports.deleteLike = (req, res, next) => {
  const query = `DELETE FROM postLike WHERE userId = ${req.auth.userId} AND postId = ${req.params.id}`;

  db.query(query, (error) => {
    if (error) {
      res.json({ status: "Fail to delete", reason: error.code });
    } else {
      res.json({ status: "Successfully deleted", data: req.params.id });
    }
  });
};
