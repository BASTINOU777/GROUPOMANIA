// importation des modules
const express = require("express");
const router = require("express").Router();
const auth = require("../middleware/tokenAuth");
const postCtrl = require("../controllers/post");

/*----- CRUD pour un Post ----------*/

//Valisation des tokens pour ajouter à toutes les routes
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
// router.put("/:id/:userId", auth, postCtrl.likePost);

module.exports = router;
