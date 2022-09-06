// importation du package http de node
const http = require("http");
// importation de l'app
const app = require("./app");
// importation de la config de la base de données 
const db = require("./config/dbConfig.js");

/* Création de l'app Server */

// Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// indiquation à l'app express sur quel port elle tourne
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
// Recherche des différentes erreurs dans express et on les gère de manière appropriées
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Création d'un serveur grâce au package http
const server = http.createServer(app);
// On enregistre la fonction errorHandler dans le serveur
server.on("error", errorHandler);
//on écoute le serveur
server.on("listening", () => {
  const address = server.address();
  //sur le bon port
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
// on écoute le seveur
server.listen(port);

// Connection à la base de données 
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

// Synchronisation de la base de données au port API en cours d’exécution
db.sequelize.sync({ force: false }).then(() => {
  server.listen(port);
  console.log("Re-Sync done");
});