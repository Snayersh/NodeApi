const express = require("express");
const router = express.Router();
const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
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
router.get("/usuario", verificartoken, tokenoperadores, obtenerusuarios);
//ruta para obtener un usuario por id
router.get("/usuario/:id", verificartoken, tokenoperadores, obtenerusuarioId);
//ruta para actualizar un usuario por id
router.put("/usuario/:id", verificartoken, tokenoperadores, actualizarusuario);
//ruta para inactivar un usuario por id
router.put("/usuarioDel/:id", verificartoken, tokenoperadores, eliminarusuario);

module.exports = router;
