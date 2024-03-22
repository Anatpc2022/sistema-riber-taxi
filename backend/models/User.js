const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: String, // Não é mais obrigatório
});

userSchema.statics.registerUser = async function (
  email,
  password,
  confirmPassword
) {
  try {
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("Este email já está sendo usado.");
    }

    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem.");
    }

    const newUser = new this({ email, password, confirmPassword });
    await newUser.save();

    return { message: "Usuário cadastrado com sucesso." };
  } catch (error) {
    throw new Error("Erro no servidor.");
  }
};

module.exports = mongoose.model("User", userSchema);
