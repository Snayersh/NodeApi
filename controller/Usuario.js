const bcrypt = require("bcryptjs");
const Usuario = require("../models/modelUsuario");

// Registrar un usuario
exports.registrarUsuario = async (req, res) => {
  const {
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    Clientes_idClientes,
  } = req.body;

  if (!password || password.length < 5) {
    return res.status(400).json({ error: "Contrase;a muy corta" });
  }
  try {
    // hash de la contrase;a
    const hashedPassword = await bcrypt.hash(password, 10);

    //creacion de usuario para la base de datos
    await Usuario.create({
      correo_electronico,
      nombre_completo,
      password: hashedPassword,
      telefono,
      fecha_nacimiento,
      Clientes_idClientes,
    });

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

//Obtener todos los usuarios
exports.obtenerusuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};

//obtenre usuario por id
exports.obtenerusuarioId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({ where: { idusuarios: id } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ error: "error al obtener el usuario por id" });
  }
};

//Actualizar un usuario
exports.actualizarusuario = async (req, res) => {
  const { id } = req.params;
  const { correo_electronico, nombre_completo, password, telefono } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { idusuario: id } });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    if (correo_electronico) usuario.correo_electronico = correo_electronico;
    if (nombre_completo) usuario.nombre_completo = nombre_completo;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      usuario.password = hashedPassword;
    }
    if (telefono) usuario.telefono = telefono;
    await usuario.save();
    res.status(200).json({ mensaje: "usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

/*eliminar de manera logica un usuario
volviendolo estado inactivo */

exports.eliminarusuario = async (req, res) => {
  const { id } = req.params;
  const  estados_idestados  = 2; //Inactivar
  try {
    const usuario = await Usuario.findOne({ where: { idusuarios: id } });
    if (!usuario) {
      return res.status(400).json({ error: "usuario no encontrado" });
    }
    usuario.estados_idestados = estados_idestados;
    await usuario.save();
    res.status(200).json({ mensaje: "usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
