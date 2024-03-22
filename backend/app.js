// app.js

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./db/conn");

// Importar as rotas de drivers
const driverRoutes = require("./routes");

// Importar as rotas de autenticação
const authRoutes = require("./authRoutes");

// Rotas relacionadas a drivers, prefixadas com "/drivers"
app.use("/drivers", driverRoutes);

// Rotas relacionadas à autenticação, sem prefixo
app.use(authRoutes);

const port = 3000;

app.listen(port, async () => {
  console.log(`O servidor iniciou na porta: ${port}`);
});
