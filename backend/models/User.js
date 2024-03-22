// models/User.js
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
});

// Adicione a função registerUser diretamente no schema do Mongoose
userSchema.statics.registerUser = async function (email, password) {
  try {
    // Verifique se já existe um usuário com o mesmo email
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("Este email já está sendo usado.");
    }

    // Crie um novo usuário
    const newUser = new this({ email, password });
    await newUser.save();

    return { message: "Usuário cadastrado com sucesso." };
  } catch (error) {
    throw new Error("Erro no servidor.");
  }
};

module.exports = mongoose.model("User", userSchema);
