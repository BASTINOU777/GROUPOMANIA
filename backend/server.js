const express = require("express");
const cors = require("cors");
const PORT = 4200;
const app = express();
var corsOptions = {
  origin: `http://localhost:${PORT}`, // URL du Front
};

app.use(cors(corsOptions));
app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: true })); // parsing application/x-www-form-urlencodedconst PORT = process.env.PORT || 8080; // Portapp.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
