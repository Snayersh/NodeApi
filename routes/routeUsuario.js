const express = require("express");
const router = express.Router();

const {
  registrarUsuario,
  obtenerusuarios,
  obtenerusuarioId,
  actualizarusuario,
  eliminarusuario,
} = require("../controller/Usuario");

//ruta para registrar un nuevo usuario
router.post("/usuario", registrarUsuario);
//Ruta para obtener todos los usuarios
router.get("/usuario", obtenerusuarios);
//ruta para obtener un usuario por id
router.get("/usuario/:id", obtenerusuarioId);
//ruta para actualizar un usuario por id
router.put("/usuario/:id", actualizarusuario);
//ruta para inactivar un usuario por id
router.put("/usuarioDel/:id", eliminarusuario);

module.exports = router;
