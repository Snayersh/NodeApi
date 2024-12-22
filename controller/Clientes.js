const  Clientes  = require("../models/modelCliente");

exports.registrarClientes = async (req, res) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } =
    req.body;
  try {
    await Clientes.Create({
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      email,
    });
    res.status(201).json({ mensaje: "Cliente registrado con exito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el cliente" });
  }
};

exports.obtenerclientes = async (req, res) => {
  try {
    const clientes = await Clientes.findAll();
    res.status(200).json({ clientes });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }
};

exports.obtenerclientesid = async (req, res) => {
  const { id } = req.params;
  try {
    const clientes = await Clientes.findOne({ where: { idClientes: id } });
    if (!clientes) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json({ clientes });
  } catch (error) {
    res.status(500).json({ error: "Error al obtgener el usuario por id" });
  }
};

exports.actualizarclientes = async (req, res) => {
  const { id } = req.params;
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } =
    req.body;
  try {
    const clientes = await Clientes.findOne({ where: { idClientes: id } });
    if (!clientes) {
      return res.status(400).json({ error: "Cliente no encontrado" });
    }
    if (razon_social) clientes.razon_social = razon_social;
    if (nombre_comercial) clientes.nombre_comercial = nombre_comercial;
    if (direccion_entrega) clientes.direccion_entrega = direccion_entrega;
    if (telefono) clientes.telefono = telefono;
    if (email) clientes.email = email;
    await clientes.save();
    res.status(200).json({ mensaje: "Cliente acutalizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};
