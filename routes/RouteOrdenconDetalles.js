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
  EntregarOrdencondetalles,
  eliminarOrdencondetalles,
  obtenerordencondetallesid,
} = require("../controller/OrdenConDetalles");

//ruta para insertar una nueva orden [con detalles
router.post("/Orden", verificartoken, tokenoperadorycliente, nuevaordencondetalles);
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
  "/Orden/:id",
  verificartoken,
  tokenoperadorycliente,
  obtenerordencondetallesid
);
//ruta para inactivar las ordenes
router.post("/OrdenDel/:id",verificartoken,tokenoperadorycliente,eliminarOrdencondetalles)
//ruta para Entregar las ordenes
router.post("/OrdenEntregada/:id",verificartoken,tokenoperadores,EntregarOrdencondetalles)

module.exports = router;
