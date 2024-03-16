const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.fieldname === "image" &&
      (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf")
    ) {
      cb(null, path.join(__dirname, "../public/images"));
    } else if (
      (file.fieldname === "docCnh" || file.fieldname === "docAntecedente") &&
      (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf")
    ) {
      cb(null, path.join(__dirname, "../public/docs"));
    } else {
      cb(new Error("Tipo de arquivo não suportado"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
