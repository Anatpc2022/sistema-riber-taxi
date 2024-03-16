const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.ohsgozl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Conectado com sucesso!");
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

main().catch((err) => console.log(err));

module.exports = main;
