// Connexion à la db
const db = require("../config/database");
// Importation du package jsonwebtoken pour créer des tokens et les vérifier
const jwt = require("jsonwebtoken");

const query = `SELECT * FROM post WHERE id = ${req.params.id} `;
pool.query(query, (error, results) => {
  //on vérifie l'autorisation
  if (results) {
    const token = req.headers.authorization.split(" ")[1];
    // on décode le token
    const decodedToken = jwt.verify(token, secretToken);
    //puis récupération du userId du secretToken
    const userId = decodedToken.userId;

    // Comparaison du reultat de userId et celui du token
    if (results[0].userId && results[0].userId !== userId) {
      const query = `SELECT * FROM user WHERE roleId = ${req.auth.userId}`;
      pool.query(query, (error, results) => {
        if (results[0].roleId == 1) {
          next();
        } else {
          res.status(403).json({ message: "Unauthorized request !" });
        }
      });
    } else {
      next();
    }
  }
});
