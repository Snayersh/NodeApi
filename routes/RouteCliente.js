const express = require("express");
const router = express.Router();

const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
const {
  registrarClientes,
  obtenerclientes,
  obtenerclientesid,
  actualizarclientes,
} = require("../controller/Clientes");

//ruta para registrar un nuevo cliente
router.post(
  "/Clientes",  registrarClientes
);
//Ruta para obtener todos los clientes
router.get("/Clientes", verificartoken, tokenoperadores, obtenerclientes);
//Ruta para obtener un cliente por id
router.get("/Clientes/:id", verificartoken, tokenoperadores, obtenerclientesid);
//Ruta para actualizar los clientes
router.put(
  "/Clientes/:id",
  verificartoken,
  tokenoperadores,
  actualizarclientes
);

module.exports = router;
