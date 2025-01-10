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
  obtenerproductonombre,
  actualizarproducto,
  eliminarproducto,
  obtenerproductoid
} = require("../controller/producto");

//registrar un nuevo producto
router.post("/Productos", registrarproducto);
//ruta para obtener todos los productos
router.get("/Productos",verificartoken,tokenoperadorycliente,obtenerproductos);
//ruta para obtener producto con por nombre, id o marca
router.get("/Producto/:nombre",verificartoken,tokenoperadorycliente,obtenerproductonombre);
//ruta para obtener por id
router.get("/Producto/:id",verificartoken,tokenoperadorycliente,obtenerproductoid);

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
