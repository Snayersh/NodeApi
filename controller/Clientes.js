const  Clientes  = require("../models/modelCliente");
const sequelize = require("../config/database")


exports.registrarClientes = async (req, res) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } =
    req.body;
  try {
    await sequelize.query(
      `Exec p_insertarclientes
      @razon_social = :razon_social,
      @nombre_comercial = :nombre_comercial,
      @direccion_entrega = :direccion_entrega,
      @telefono = :telefono,
      @email = :email`,
      {
        replacements: {
          razon_social,
          nombre_comercial,
          direccion_entrega,
          telefono,
          email,
        },type: sequelize.QueryTypes.INSERT,

      }
    );
    res.status(201).json({ mensaje: "Cliente registrado con exito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el cliente" });
  }
};

exports.obtenerclientes = async (req, res) => {
  try {
    const clientes = await Clientes.findAll();
    res.status(200).json( clientes );
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }
};

exports.obtenerclientesid = async (req, res) => {
  const { dato } = req.params;
  try {
    if(!dato){return res.status(400).json({error:"Ingrese el id, nombre comercial o correo"})}
    const clientes = await Clientes.findOne({ where: { [Op.or]: [
              { idClientes: { [Op.like]: `%${dato}` } },
              { nombre_comercial: { [Op.like]: `%${dato}%` } },
              { email: { [Op.like]: `%${dato}%` } },
            ], } });
    if (!clientes) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json( clientes );
  } catch (error) {
    res.status(500).json({ error: "Error al obtgener el usuario por id" });
  }
};

exports.actualizarclientes = async (req, res) => {
  const { id } = req.params;
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } =
    req.body;
  try {
    const [clientes] = await sequelize.query(
      `exec p_actualizarclientes 
        @idcliente = :idcliente,
        @razon_social = :razon_social,
        @nombre_comercial = :nombre_comercial,
        @direccion_entrega = :direccion_entrega,
        @telefono = :telefono,
        @email = :email
`,
      {
        replacements: {
          idcliente:id,
          razon_social,
          nombre_comercial,
          direccion_entrega,
          telefono,
          email,
        },type: sequelize.QueryTypes.UPDATE,

      }
    );
    if (!clientes) {
      return res.status(400).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json({ mensaje: "Cliente acutalizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};
