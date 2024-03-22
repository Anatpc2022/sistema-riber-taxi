const express = require("express");
const router = express.Router();
const upload = require("./helpers/upload");

const { createUser, registerUser } = require("./controllers/AuthController");
const {
  createDriver,
  getDrivers,
  getDriver,
  deleteDriver,
  updateDriver,
  addDaily,
} = require("./controllers/DriverController");

// Rota de login na raiz "/"
router.post("/", (req, res) => createUser(req, res));

// Rota de registro de usuário
router.post("/register", (req, res) => registerUser(req, res)); // Adicione essa linha

router.post(
  "/drivers",
  upload.fields([
    { name: "docCnh", maxCount: 1 },
    { name: "docAntecedente", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res, next) => {
    const isDailyPaymentUpdate = req.body.isDailyPaymentUpdate === "true";

    // Verifica se é uma solicitação de atualização de motorista para pagamento de diária
    if (isDailyPaymentUpdate) {
      // Se for uma atualização para pagamento de diária, verifica a presença opcional do campo "image"
      const image = req.files["image"];
      if (image && image.length > 0) {
        // Se houver imagem, continua para o próximo middleware
        next();
      } else {
        // Se não houver imagem, continua sem erro
        next();
      }
    } else {
      // Se não for uma atualização para pagamento de diária, verifica a presença dos campos "docCnh" e "docAntecedente"
      const docCnh = req.files["docCnh"];
      const docAntecedente = req.files["docAntecedente"];

      if (!docCnh || !docAntecedente) {
        return res
          .status(400)
          .json({ msg: "Por favor, envie os arquivos necessários." });
      }
      next();
    }
  },
  (req, res) => createDriver(req, res)
);

router.get("/drivers", (req, res) => getDrivers(req, res));

router.get("/drivers/:id", (req, res) => getDriver(req, res));

router.delete("/drivers/:id", (req, res) => deleteDriver(req, res));

router.patch(
  "/drivers/:id",
  upload.fields([
    { name: "docCnh", maxCount: 1 },
    { name: "docAntecedente", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res, next) => {
    const isDailyPaymentUpdate = req.body.isDailyPaymentUpdate === "true";

    // Verifica se é uma solicitação de atualização de motorista para pagamento de diária
    if (isDailyPaymentUpdate) {
      // Se for uma atualização para pagamento de diária, verifica a presença opcional do campo "image"
      const image = req.files["image"];
      if (image && image.length > 0) {
        // Se houver imagem, continua para o próximo middleware
        next();
      } else {
        // Se não houver imagem, continua sem erro
        next();
      }
    } else {
      // Se não for uma atualização para pagamento de diária, verifica a presença dos campos "docCnh" e "docAntecedente"
      const docCnh = req.files["docCnh"];
      const docAntecedente = req.files["docAntecedente"];

      if (!docCnh || !docAntecedente) {
        return res
          .status(400)
          .json({ msg: "Por favor, envie os arquivos necessários." });
      }
      next();
    }
  },
  (req, res) => updateDriver(req, res)
);

router.patch("/drivers/:id/daily", upload.single("image"), (req, res) =>
  addDaily(req, res)
);

module.exports = router;
