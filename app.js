const config = require("./config/database");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
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
app.use("/api", login);
app.use("/api", Usuario);
app.use("/api", Cliente);
app.use("/api", Categoria);
app.use("/api", Productos);
app.use("/api", OrdenDetalles);
app.use("/api", Estados);
app.get("/api/validar", validacion);

const port = process.env.port;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
