const express = require("express");
const router = express.Router();

const {
  registrarClientes,
  obtenerclientes,
  obtenerclientesid,
  actualizarclientes,
} = require("../controller/Clientes");

//ruta para registrar un nuevo cliente
router.post("/Cliente", registrarClientes);
//Ruta para obtener todos los clientes
router.get("/Clientes", obtenerclientes);
//Ruta para obtener un cliente por id
router.get("/Clientes/:id", obtenerclientesid);
//Ruta para actualizar los clientes
router.put("/Clientes/:id", actualizarclientes);

module.exports = router;
