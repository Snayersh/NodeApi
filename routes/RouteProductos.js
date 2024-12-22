const express = require("express");
const router = express.Router();
const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
const {
  registrarproducto,
  obtenerproductos,
  obtenerproductoid,
  actualizarproducto,
  eliminarproducto,
} = require("../controller/producto");

//registrar un nuevo producto
router.post("/Productos", verificartoken, tokenoperadores,registrarproducto);
//ruta para obtener todos los productos no se coloca token para poder ver producto sin inciar sesion
router.get("/Productos", obtenerproductos);
//ruta para obtener producto con por id no se coloca token para poder ver producto sin inciar sesion
router.get("/Productos/:id", obtenerproductoid);
//ruta para actualizar solo operadores
router.put(
  "/Productos/:id",
  verificartoken,
  tokenoperadores,
  actualizarproducto
);
//ruta para inactivar un producto de manera logica
router.put(
  "/ProductosDel/:id",
  verificartoken,
  tokenoperadores,
  eliminarproducto
);

module.exports = router;
