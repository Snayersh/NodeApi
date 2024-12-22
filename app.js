const config = require("./config/database");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());

const validacion = require("./middlewares/verificacioncuenta");
const login = require("./routes/Routelogin");
const Usuario = require("./routes/routeUsuario");
const Cliente = require("./routes/RouteCliente");
const Categoria = require("./routes/RouteCategoriaProducto");
const Productos = require("./routes/RouteProductos");
const OrdenDetalles = require("./routes/RouteOrdenconDetalles");
const Estados = require("./routes/RouteEstados");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Bienvenido");
});
app.get("/api", (req, res) => {
  res.send("Bienvenido");
});
//login
app.use("/api", login);
//usuario
app.use("/api", Usuario);
//Clientes
app.use("/api", Cliente);
//CategoriaProductos
app.use("/api", Categoria);
//Producoss
app.use("/api", Productos);
//Orden Con detalels
app.use("/api", OrdenDetalles);
//Estados
app.use("/api", Estados);
//validar correo
app.get("/api/validar", validacion);

const port = process.env.port;
app.listen(port);

console.log(`Servidor en el puerto:${port}`);
