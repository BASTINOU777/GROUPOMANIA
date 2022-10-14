const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token" + token);
    // Décodage du token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    // Récupération du userId encodé dans le token
    const userId = decodedToken.user_id;
    console.log("c'est l'userId" + userId);
    // res.locals.userId = userId;
    // res.locals.admin = decodedToken.admin;
    req.auth = {
      userId,
    };
    next();
  } catch {
    res.status(403).json({ error: "Oups tu n'est pas connecté!" });
  }
};
