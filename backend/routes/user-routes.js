const express = require("express");

//importation router express
const router = express.Router();

//importation du middleware d'authentiication des users
const userAuth = require("../middleware/user-auth");

//importation du middleware d'authentiication pour les tokens
const tokenAuth = require("../middleware/token-auth");

//importation du controller pour les users
const userController = require("../controllers/userController");

//toutes les routes CRUD des user
router.get("/users", userAuth, userCtrl.users);
router.put("/:id", userAuth, multerUser, userCtrl.modifyUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//exportation du module router
module.exports = router;
