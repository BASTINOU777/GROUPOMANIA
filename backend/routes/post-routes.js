// importation des modules
const express = require("express");
const postCtrl = require("../controllers/postController");
const auth = require("../middleware/tokenAuth");
const router = require("express").Router();

/*----- CRUD pour un Post ----------*/

//Valisation des tokens pour ajouter àtoutes les routes
router.post("/", multer, postCtrl.createPost);

router.get("/", postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);

router.put("/:id", postCtrl.updatePost);

router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
