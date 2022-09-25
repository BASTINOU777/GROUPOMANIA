// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification pour les users
const auth = require("../middleware/tokenAuth");

// On importe le controller pour les likes
const postCtrl = require("../controllers/likeController");

router.get("/:id", auth, postCtrl.getLike);
router.post("/", auth, postCtrl.like);
router.delete("/:id", auth, postCtrl.deleteLike);

// On exporte le routeur
module.exports = router;
