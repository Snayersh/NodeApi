const bcrypt = require("bcryptjs");
const usuarios = require("../models/modelUsuario");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/modelUsuario");

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { correo_electronico, password } = req.body;
  if (!correo_electronico || !password) {
    return res
      .status(400)
      .json({ error: "Correo electronico y contrase;a son necesarios" });
  }
  try {
    //busqueda del usuario
    const usuario = await usuarios.findOne({ where: { correo_electronico } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    //valida si la cuenta esta en estado activo quer seria 1
    if (usuario.estados_idestados !== 1) {
      return res.status(403).json({ error: "la cuenta no esta activada" });
    }

    // Comparacion de contrase;as
    const comparacion = await bcrypt.compare(password, usuario.password);

    if (!comparacion) {
      return res.status(401).json({ error: "contrase;a incorrecta" });
    }
    const token = jwt.sign(
      { id: usuario.idusuarios, rol_idrol: usuario.rol_idrol, Clientes_idClientes: usuario.Clientes_idClientes, nombre_completo : usuario.nombre_completo, direccion: usuario.direccion, telefono: usuario.telefono, correo_electronico : usuario.correo_electronico },
      process.env.JWT_SECRET,
      {
        expiresIn: "1H",
      }
    );
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      rol_idrol: usuario.rol_idrol,
      idusuarios: usuario.idusuarios,
      Clientes_idClientes:  usuario.Clientes_idClientes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
