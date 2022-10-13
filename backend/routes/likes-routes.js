// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification pour les users
const userAuth = require("../middleware/tokenAuth");

// On importe le controller pour les likes
const postCtrl = require("../controllers/like");

// route des likes
router.get("/:id/like", userAuth, postCtrl.Like);

module.exports = router;
