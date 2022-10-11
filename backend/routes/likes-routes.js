// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification pour les users
const userAuth = require("../middleware/tokenAuth");

// On importe le controller pour les likes
const postCtrl = require("../controllers/likesControllers");

// route des likes
router.get("/post/:id/like", userAuth, postCtrl.getLike);
router.post("/post/:id/like", userAuth, postCtrl.likePost);

module.exports = router;