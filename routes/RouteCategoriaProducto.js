const express = require("express");
const router = express.Router();

const {
  registrarcategoria,
  obtenercategoria,
  obtenercategoriaid,
  actualizarcategoria,
  eliminarcategoria,
} = require("../controller/CategoriasProductos");

//ruta para registrar una nueva categoria
router.post("/CategoriaProductos", registrarcategoria);
//ruta para obtener todas las categorias
router.get("/CategoriaProductos", obtenercategoria);
//ruta para obtener categoria por id
router.get("/CategoriaProductos/:id", obtenercategoriaid);
//ruta para actualizar una categoria
router.put("/CategoriaProductos/:id", actualizarcategoria);
//rutra para inactivar una categoria
router.put("/CategoriaProductosDel", eliminarcategoria);

module.exports = router;
