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
    attachement: `${req.protocol}://${req.get("host")}/pictures/${
      req.file.filename
    }`,
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
exports.modifyPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id }).then((post) => {
    if (req.file && req.file.mimetype.split("/")[0] === "pictures") {
      const filename = post.imageURL.split("pictures/")[1];
      fs.unlink(`pictures/${filename}`, () => {
        PostModel.updateOne(
          { _id: req.params.id },
          {
            ...req.body,
            imageURL: `${req.protocol}://${req.get("host")}/pictures${
              req.file.filename
            }`,
            _id: req.params.id,
          }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Publication avec image modifiée !" })
          )
          .catch(() =>
            res.status(400).json({
              error: "Impossible de modifier la piblication avec son image !",
            })
          );
      });
    } else {
      PostModel.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          _id: req.params.id,
        }
      )
        .then(() => res.status(200).json({ message: "Publication modifiée" }))
        .catch(() =>
          res
            .status(400)
            .json({ error: "Impossible de modifier la publication !" })
        );
    }
  });
};

exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Publication supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    let index = post.userLiked.findIndex((elem) => elem == req.params.userId);
    if (index == -1) {
      post.like++;
      post.userLiked.push(req.params.userId);
      //update
    } else {
      post.like--;
      post.userLiked.splice(index, 1);
      //update
    }
  });
};
