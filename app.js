const config = require("./config/database");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());

const Usuario = require("./routes/routeUsuario");
const Cliente = require("./routes/RouteCliente");
const Categoria = require("./routes/RouteCategoriaProducto")
app.use(morgan("dev"));

app.use("/api", Usuario);
app.use("/api", Cliente);
app.use("/api",Categoria)

app.get("/", (req, res) => {
  res.send("Bienvenido");
});
const port = process.env.port;
app.listen(port);

console.log("Servidor en el puerto:${port}");
