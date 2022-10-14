const express = require("express");
const router = express.Router();
const auth = require("../middlewares/tokenAuth");
const signUpCtrl = require("../controllers/signUp");

router.post("/signup", signUpCtrl.signUp);
router.post("/login", signUpCtrl.login);
router.get("/permissions", auth, signUpCtrl.checkPermissions);

module.exports = router;
