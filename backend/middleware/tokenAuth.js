const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    console.log("DEBUG user id Body : ", req.body.userId);
    console.log("DEBUG user id Headers : ", req.headers["user-id"]);

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const currentUserId = req.headers["user-id"] ?? req.body.userId;
    res.locals.userId = userId;
    res.locals.admin = decodedToken.admin;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Compte non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Oups tu n'est pas connecté!" });
  }
};
