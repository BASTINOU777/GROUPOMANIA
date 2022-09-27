const db = require("../models");
const Comment = db.comments;

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: { postId: req.params.postId },
    include: ["userId"],
    order: [["commentId", "DESC"]],
  })
    .then((allComments) => {
      res.status(200).json(allComments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createComment = (req, res, next) => {
  const newComment = {
    userId: req.body.item.userId,
    postId: req.body.item.postId,
    text: req.body.item.text,
  };
  Comment.create(newComment)
    .then(() =>
      res
        .status(201)
        .json({ message: "Une nouvelle publication enregistrée !" })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { commentId: req.params.id } })
    .then(() => res.status(200).json({ message: "Publication supprimée" }))
    .catch((error) => res.status(400).json({ error }));
};
