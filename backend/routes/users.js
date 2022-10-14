/*----- importation des modules -----*/
const express = require("express");
//importation router express
const router = express.Router();

/*---- Middleware ------*/
//importation du middleware d'authentification pour les tokens
const auth = require("../middlewares/tokenAuth");
//importation du controller pour les users
const userCtrl = require("../controllers/users");

/*---- Les routes CRUD des user-----*/

router.get("/:username", auth, userCtrl.getOneUser);
router.put("/:username", auth, userCtrl.modifyUser);
router.delete("/:username", auth, userCtrl.deleteUser);

//exportation du module router
module.exports = router;
