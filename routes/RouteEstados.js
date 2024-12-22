const express = require("express");
const router = express.Router();
const {
  tokencliente,
  tokenoperadorycliente,
  tokenoperadores,
  verificartoken,
} = require("../middlewares/jsonwebtoken");
const {
  actualizarestados,
  nuevoEstado,
  obtenerestados,
} = require("../controller/estados");

//nuevo estado
router.post("/Estado", verificartoken, tokenoperadores, nuevoEstado);
//actualizar estado
router.put("/Estado/:id", verificartoken, tokenoperadores, actualizarestados);
//listar todos los estados
router.get("/Estado", verificartoken, tokenoperadores, obtenerestados);

module.exports = router;
