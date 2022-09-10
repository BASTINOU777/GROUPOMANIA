// importation des modules
const express = require("express");
const router = require("express").Router();
const auth = require("../middleware/tokenAuth");
const postCtrl = require("../controllers/postController");

/*----- CRUD pour un Post ----------*/

//Valisation des tokens pour ajouter àtoutes les routes
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
