const posts = require("../models").posts;
const fs = require("fs");
// const db = require("../models");
const { users } = require("../models");
// const posts = db.posts;

// exports.createPost = async (req, res, next) => {
//   console.log(req.body);
//   const { userId, author, title, content } = req.body;
//   const attachement = req.file
//     ? `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`
//     : "";

//   try {
//     const postCreated = await posts.create({
//       userId: userId,
//       author: author,
//       title: title,
//       content: content,
//       attachement: attachement,
//     });

//     // If the post is not created, we throw an error
//     if (!postCreated) throw new Error("Post not created");

//     // Else we return 201 status code and message
//     res.status(201).json("Post created");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };
exports.createPost = async (req, res, next) => {
  const postToCreate = {
    content: req.body.content,
    author: req.body.author,
    title: req.body.title,
    userId: req.body.userId,
  };
  let dataToPush;

  if (req.file) {
    dataToPush = {
      attachement: `${req.protocol}://${req.get("host")}/pictures/${
        req.file.filename
      }`,
      ...postToCreate,
    };
  } else {
    dataToPush = postToCreate;
  }

  try {
    await posts.create(dataToPush);
    return res.status(201).json("Post created");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = (req, res, next) => {
  // console.log("=>", posts);
  posts
    .findAll({
      raw: true,
      include: {
        model: users,
      },
      order: [["userId", "DESC"]],
    })
    .then((allPosts) => {
      console.log("=> allposts ", allPosts);
      res.status(200).json(allPosts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnePost = async (req, res) => {
  const post = await posts.findOne({
    id: req.params.userId,
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
  delete req.body.userId;
  if (req.file !== undefined) {
    posts
      .findOne({ id: req.params.userId })
      .then((post) => {
        const filename = post.attachement.split("pictures/")[1];
        fs.unlink(`pictures/${filename}`, () => {
          posts
            .updateOne(
              { id: req.params.userId },
              { ...postObject, id: req.params.userId }
            )
            .then(() => res.status(200).json("Publication mise ?? jour!"))
            .catch((error) => res.status(401).json({ error }));
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    posts
      .updateOne({ id: req.params.userId }, { content: content })
      .then(() => res.status(200).json("Publication mise ?? jour!"))
      .catch((error) => res.status(401).json({ error }));
  }
};

exports.deletePost = async (req, res) => {
  await posts
    .findOne({ id: req.params.userId })
    .then((post) => {
      if (post.attachement) {
        const filename = post.attachement.split("/pictures/")[1];
        fs.unlink(`pictures/${filename}`, () => {
          post.deleteOne({ id: req.params.userId });
        });
        res.status(200).json({ message: "Publication supprim??e !" });
      } else {
        post.deleteOne({ id: req.params.userId });
        res.status(200).json({ message: "Publication supprim??e !" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
