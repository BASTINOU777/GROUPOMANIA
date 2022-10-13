/*----- importation des modules -----*/
const express = require("express");
//importation router express
const router = express.Router();

/*---- Middleware ------*/
//importation du middleware d'authentification pour les tokens
const auth = require("../middleware/tokenAuth");
//importation du controller pour les users
const userCtrl = require("../controllers/user");

/*---- Les routes CRUD des user-----*/

router.get("/:userName", auth, userCtrl.getOneUser);
router.put("/:userName", auth, userCtrl.modifyUser);
router.delete("/:userName", auth, userCtrl.deleteUser);

//exportation du module router
module.exports = router;
