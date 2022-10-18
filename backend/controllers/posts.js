// const posts = require("../models/posts");
const fs = require("fs");
const db = require("../models");
const posts = db.posts;

// exports.createPost = async (req, res) => {
//   const { id, author, title, content } = req.body;
//   const attachement = req.file
//     ? `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`
//     : "";
//   await posts
//     .create({
//       id: id,
//       author: author,
//       title: title,
//       content: content,
//       attachement: attachement,
//     })
//     .then(() => {
//       res.status(201).json({ message: "Nouveau Post créé!" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };
exports.createPost = async (req, res) => {
  const { id, author, title, content } = req.body;
  const attachement = req.file
    ? `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`
    : "";

  try {
    const postCreated = await posts.create({
      id: id,
      author: author,
      title: title,
      content: content,
      attachement: attachement,
    });

    // If the post is not created, we throw an error
    if (!postCreated) throw new Error("Post not created");

    // Else we return 201 status code and message
    res.status(201).json("Post created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  console.log("test get all posts");
  //affichage des all posts du plus récent au plus ancien et les met à jour
  const allPosts = await posts.find({}).sort({ updateAt: "desc" }).exec();
  console.log("===>>> db posts", posts);
  res.status(200).json(allPosts);
};

exports.getOnePost = async (req, res) => {
  const post = await posts.findOne({
    _id: req.params.id,
  });
  res.status(200).json(post);
};

exports.modifyPost = async (req, res) => {
  const { content } = req.body;
  const attachement = req.file
    ? `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`
    : "";
  const postObject = {
    title,
    content,
    attachement: attachement,
  };
  delete req.body.user_id;
  if (req.file !== undefined) {
    posts
      .findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.attachement.split("pictures/")[1];
        fs.unlink(`pictures/${filename}`, () => {
          posts
            .updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
            .then(() => res.status(200).json("Publication mise à jour!"))
            .catch((error) => res.status(401).json({ error }));
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    posts
      .updateOne({ _id: req.params.id }, { content: content })
      .then(() => res.status(200).json("Publication mise à jour!"))
      .catch((error) => res.status(401).json({ error }));
  }
};

exports.deletePost = async (req, res) => {
  await posts
    .findOne({ _id: req.params.id })
    .then((post) => {
      if (post.attachement) {
        const filename = post.attachement.split("/pictures/")[1];
        fs.unlink(`pictures/${filename}`, () => {
          post.deleteOne({ _id: req.params.id });
        });
        res.status(200).json({ message: "Publication supprimée !" });
      } else {
        post.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Publication supprimée !" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
