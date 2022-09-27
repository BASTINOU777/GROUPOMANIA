const db = require("../models/index");
const Post = db.Post;

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: ["user", db.comments],
    order: [["postId", "DESC"]],
  })
    .then((allPosts) => {
      res.status(200).json(allPosts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id, { include: ["user", db.comments] })
    .then((onePost) => {
      res.status(200).json(onePost);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.createPost = (req, res, next) => {
  const newPost = {
    userId: req.body.item.userId,
    title: req.body.item.title,
    text: req.body.item.text,
  };
  Post.create(newPost)
    .then(() =>
      res.status(201).json({ message: "Nouvelle publication enregistrée !" })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { postId: req.params.id } })
    .then(() => res.status(200).json({ message: "Post deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};
