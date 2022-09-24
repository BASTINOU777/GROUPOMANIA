// importation des modules
const express = require("express");
const router = require("express").Router();
const auth = require("../middleware/tokenAuth");
const likesCtrl = require("../controllers/likeController");

/*----- CRUD pour un Post ----------*/

//Valisation des tokens pour ajouter à toutes les routes
router.get("/", auth, likesCtrl.usersLiked);
router.get("/:id", auth, likesCtrl.likePost);
router.post("/", auth, likesCtrl.usersLiked);
router.delete("/:id", auth, likesCtrl.deleteLike);

module.exports = router;
