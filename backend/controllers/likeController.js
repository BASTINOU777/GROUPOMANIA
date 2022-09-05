// conexion à la DB 
const db = require("../config/db");

// l'user peut liker ou disliker les posts
exports.likePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    
    if (like === 1) {
      Post.updateOne(
        { _id: postId },
        {
          $inc: { likes: like },
          $push: { usersLiked: userId },
        }
      )
        .then((post) => res.status(200).json({ message: "Post appréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
  
    // 2. l'utilisateur n'aime pas un post pour la première fois (comme === -1)
    // pousse l'userId vers le tableau usersLiked ; un like de moins.
    else if (like === -1) {
      Post.updateOne(
        { _id: postId },
        {
          $inc: { dislikes: -1 * like },
          $push: { usersDisliked: userId },
        }
      )
        .then((post) => res.status(200).json({ message: "Post dépréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
    // 3. L'utilisateur change d'avis
    // 3.1. l'utilisateur reprend son like :
    else {
      Post.findOne({ _id: postId })
        .then((post) => {
          if (post.usersLiked.includes(userId)) {
            Post.updateOne(
              { _id: postId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then((post) => {
                res.status(200).json({ message: "Post dépréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
            //3.2 l'utilisateur change d'avis sur son dislike
          } else if (post.usersDisliked.includes(userId)) {
            Post.updateOne(
              { _id: postId },
              {
                $pull: { usersDisliked: userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((post) => {
                res.status(200).json({ message: "Post appréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
          }
        })
        .catch((error) => res.status(401).json({ error }));
    }
  };