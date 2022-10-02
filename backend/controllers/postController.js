const { post } = require("../app");
const db = require("../models/index");
const Post = db.Post;

exports.getAllPosts = (req, res, next) => {
  console.log("test");
  Post.findAll()
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
  console.log(req.body);
  const newPost = {
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    attachement: "pictures",
  };
  console.log(newPost);
  Post.create(newPost)
    .then((data) =>
      res
        .status(201)
        .json({ message: "Nouvelle publication enregistrée !", data })
    )
    .catch((error) => res.status(400).json(error));
};

exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Post deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};
exports.likePost = (req, res, next) => {
  let Like = req.params.like;
  if (Like == 1) {
    Post.findByPk(req.params.id);
  } else if (Like == 0) {
    Post.findByPk(req.params.id);
  }
};
