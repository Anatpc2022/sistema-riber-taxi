// app.js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./db/conn");

const driverRoutes = require("./routes");

// Rotas relacionadas a drivers, prefixadas com "/drivers"
app.use("/drivers", driverRoutes);

// Rota de login na raiz "/"
const loginRoute = require("./routes");
app.use("/login", loginRoute);

const port = 3000;

app.listen(port, async () => {
  console.log(`O servidor iniciou na porta: ${port}`);
});
