/*----- importation des modules -----*/
const express = require("express");
//importation router express
const router = express.Router();

/*---- Middleware ------*/
//importation du middleware d'authentiication des users
const userAuth = require("../middleware/userAuth");
//importation du middleware d'authentification pour les tokens
const tokenAuth = require("../middleware/tokenAuth");
//importation du controller pour les users
const userCtrl = require("../controllers/userController");

/*---- Les routes CRUD des user-----*/

router.get("/users", auth, userCtrl.getOneUsers);
router.put("/:id", auth, userCtrl.modifyUser);
//route pour enregistrer un user
router.post("/signup", userCtrl.signup);
//route pour le login du user
router.post("/login", userCtrl.login);
// routz pour supprimer un user
router.delete("/:users", auth, profilesCtrl.deleteUsers);

//exportation du module router
module.exports = router;
