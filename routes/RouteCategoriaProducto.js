const express = require("express");
const router = express.Router();

const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
const {
  registrarcategoria,
  obtenercategoria,
  obtenerCategoriaConProductos,
  actualizarcategoria,
  eliminarcategoria,
} = require("../controller/CategoriasProductos");

//ruta para registrar una nueva categoria
router.post(
  "/CategoriaProductos",
  verificartoken,
  tokenoperadores,
  registrarcategoria
);
//ruta para obtener todas las categorias no se coloca token para poder ver producto sin inciar sesion
router.get("/CategoriaProductos",verificartoken,tokenoperadorycliente, obtenercategoria);
//ruta para obtener categoria por id
router.get("/CategoriayProductos/:id",verificartoken,tokenoperadorycliente, obtenerCategoriaConProductos);
//ruta para actualizar una categoria
router.put(
  "/CategoriaProductos/:id",
  verificartoken,
  tokenoperadores,
  actualizarcategoria
);
//rutra para inactivar una categoria
router.put(
  "/CategoriaProductosDel/:id",
  verificartoken,
  tokenoperadores,
  eliminarcategoria
);

module.exports = router;
