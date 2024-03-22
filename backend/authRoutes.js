// authRoutes.js

const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("./controllers/AuthController");

// Rota de login de usuário
router.post("/login", (req, res) => loginUser(req, res));

// Rota de registro de usuário
router.post("/register", (req, res) => registerUser(req, res));

module.exports = router;
