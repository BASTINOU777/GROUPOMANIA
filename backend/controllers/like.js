const { post } = require("../app");
const db = require("../models/index");
const Post = db.Post;

exports.Like = (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    let index = post.userLiked.findIndex((elem) => elem == req.params.userId);
    if (index == -1) {
      post.like++;
      post.userLiked.push(req.params.userId);
      //update
      Post.updateOne(
        { _id: req.params.userId },
        {
          ...req.body,
          _id: req.params.userId,
        }
      )
        .then(() =>
          res
            .status(200)
            .json({ message: "Vous avez aimé cette publication !" })
        )
        .catch(() =>
          res.status(400).json({ error: "Impossible d'aimer la publication !" })
        );
    } else {
      post.like--;
      post.userLiked.splice(index, 1);
      Post.updateOne(
        { _id: req.params.userLiked },
        {
          ...req.body,
          _id: req.params.userLiked,
        }
      )
        .then(() =>
          res
            .status(200)
            .json({ message: "Vous n'aimé plus cette publication !" })
        )
        .catch(() =>
          res
            .status(400)
            .json({ error: "Impossible de disliké cette publication !" })
        );
    }
  });
};
// // import du model post
// const Post = require("../models/post");

// exports.likePost = async (req, res) => {
//   // méthode finder sequelize pour récup le post via son id
//   const post = await Post.findById(req.params.id);
//   if (req.auth.userId !== post.userId) {
//     // si ok l'user peut liker le post
//     if (!post.likes.includes(req.auth.userId)) {
//       await post.updateOne({ $push: { likes: req.auth.userId } });
//       res.status(200).json("Liké !");
//       // sinon on retir le like avec un 200
//     } else {
//       await post.updateOne({ $pull: { likes: req.auth.userId } });
//       res.status(200).json("Like retiré !");
//     } // sinon 401
//   } else {
//     res.status(401).json("Vous ne pouvez pas liker !");
//   }
// };