const express = require("express");
const router = express.Router();
const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
const {
  nuevaordencondetalles,
  actualizaorden,
  obtenerordencondetalles,
  obtenerordencondetallesid,
} = require("../controller/OrdenConDetalles");

//ruta para insertar una nueva orden con detalles
router.post("/Orden", verificartoken, tokenoperadores, nuevaordencondetalles);
//ruta para actualizar una nueva orden
router.put("/Orden/:id", verificartoken, tokenoperadores, actualizaorden);
//ruta para listar todas las ordenes con detalles
router.get(
  "/Orden",
  verificartoken,
  tokenoperadorycliente,
  obtenerordencondetalles
);
//ruta para listar orden con detalle por id
router.get(
  "/orden/:id",
  verificartoken,
  tokenoperadorycliente,
  obtenerordencondetallesid
);

module.exports = router;
