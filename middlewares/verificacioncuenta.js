const Usuario = require("../models/modelUsuario");

const verificarcuenta = async (req, res) => {
  const {token} = req.query;
  try {
    const usuario = await Usuario.findOne({
      where: { Verificacion_token: token },
    });
    if (!usuario) {
      return res.status(400).json({ error: "Token invalido o ya utilizado" });
    }
    usuario.estados_idestados = 1; // seria activo
    usuario.Verificacion_token = null;
    await usuario.save();
    res.status(200).json({ mensaje: "Cuenta activada con exito" });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar la cuenta" });
  }
};
module.exports = verificarcuenta