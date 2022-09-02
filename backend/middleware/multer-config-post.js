// importation de  multer
const multer = require("multer");

// Création d'un dictionnaire Mime_Types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Création d'un objet de config pour multer pour enregistrer un fichier sur le diskStorage
const storage = multer.diskStorage({
  // On règle la destination
  destination: (req, file, callback) => {
    callback(null, "imagesPost");
  },
  // On donne le nom de fichier à utiliser
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation de notre middleware configuré avec multer
module.exports = multer({ storage: storage }).single("imageUrlPost");
