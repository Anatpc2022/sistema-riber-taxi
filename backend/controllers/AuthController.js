const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "O email já está em uso" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Gera um token de autenticação
    const token = jwt.sign({ userId: newUser._id }, "seu_segredo_secreto");

    // Retorna o token e outras informações do usuário, se necessário
    res
      .status(201)
      .json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "O email já está em uso" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Gera um token de autenticação
    const token = jwt.sign({ userId: newUser._id }, "seu_segredo_secreto");

    // Retorna o token e outras informações do usuário, se necessário
    res
      .status(201)
      .json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = {
  createUser,
  registerUser,
};
