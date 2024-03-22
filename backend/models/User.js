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

userSchema.statics.registerUser = async function (email, password) {
  try {
  
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("Este email já está sendo usado.");
    }


    const newUser = new this({ email, password });
    await newUser.save();

    return { message: "Usuário cadastrado com sucesso." };
  } catch (error) {
    throw new Error("Erro no servidor.teste");
  }
};

module.exports = mongoose.model("User", userSchema);
