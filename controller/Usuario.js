const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Usuario = require("../models/modelUsuario");
const nodemailer = require("nodemailer");

// Registrar un usuario
exports.registrarUsuario = async (req, res) => {
  const {
    rol_idrol,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    Clientes_idClientes,
  } = req.body;
  const ExisteCorre = await Usuario.findOne({ where: { correo_electronico } });
  if (ExisteCorre) {
    return res.status(400).json({ error: "El correo ya está en uso" });
  }
  if (!password || password.length < 5) {
    return res.status(400).json({ error: "Contrase;a muy corta" });
  }
  
  try {
    // hash de la contrase;a
    const hashedPassword = await bcrypt.hash(password, 10);

    //Generando token 
    const generartoken = crypto.randomBytes(32).toString("hex");

    //creacion de usuario para la base de datos
    await Usuario.create({
      rol_idrol,
      correo_electronico,
      nombre_completo,
      password: hashedPassword,
      telefono,
      fecha_nacimiento,
      Clientes_idClientes,
      Verificacion_token: generartoken,
    });
    const correoverificacion = `http://localhost:3000/api/validar?token=${generartoken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port:465,
      secure:true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Mi tiendita online" <noreply@mitiendita.com>`,
      to: correo_electronico,
      subject: "Verificacion Cuenta",
      html: `<p>hola ${nombre_completo},</p>   <p><a href="${correoverificacion}">Verificar Cuenta</a></p>`,
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
  const { rol_idrol,correo_electronico, nombre_completo, password, telefono } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { idusuario: id } });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    if(rol_idrol) usuario.rol_idrol = rol_idrol;
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
  const estados_idestados = 2; //Inactivar
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
