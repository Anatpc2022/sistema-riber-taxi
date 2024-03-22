const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Verificar se a senha e a confirmação da senha são idênticas
  if (!confirmPassword || password !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Salvar o novo usuário no banco de dados com a senha hash
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Retornar uma resposta de sucesso
    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro durante o registro de usuário:", error);
    return res
      .status(500)
      .json({ message: "Erro durante o registro de usuário" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email não cadastrado!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Ops! senha errada!" });
    }

    // Gera um token de autenticação
    const token = jwt.sign({ userId: user._id }, "seu_segredo_secreto");

    // Retorna o token e outras informações do usuário, se necessário
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
