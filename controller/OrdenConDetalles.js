const { json } = require("sequelize");
const sequelize = require("../config/database");
const orden = require("../models/modelOrden");
const ordendetalles = require("../models/modelOrdenDetalles");

//insertando una nueva orden en las dos tablas
exports.nuevaordencondetalles = async (req, res) => {
  const {
    usuarios_idusuarios,
    estados_idestados,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    total_orden,
    detalles,
  } = req.body;

  try {
    const datos = await sequelize.query(
      "EXEC NuevaOrdenConDetalles :usuarios_idusuarios, :estados_idestados, :nombre_completo, :direccion, :telefono, :correo_electronico,:fecha_entrega,:total_orden, :detalles",
      {
        replacements: {
          usuarios_idusuarios,
          estados_idestados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          detalles: JSON.stringify(detalles),
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ mensaje: "Orden creada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la orden" });
  }
};

//Actualizando solo la tabla orden

exports.actualizaorden = async (req, res) => {
  const { id } = req.params;
  const {
    usuarios_idusuarios,
    estados_idestados,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    total_orden,
  } = req.body;
  try {
    await sequelize.query(
      "EXEC ActualizarOrden :idOrden, :usuarios_idusuarios, :estados_idestados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega, :total_orden",
      {
        replacements: {
          idOrden: id,
          usuarios_idusuarios,
          estados_idestados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    res.status(200).json({ mensaje: "orden actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la orden" });
  }
};

//Obtener todos los orden con sus detalles
exports.obtenerordencondetalles = async (req, res) => {
  try {
    const datos = await sequelize.query("select * from Vistaordencondetalles", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ mensaje: datos });
  } catch (error) {
    res.status(500).json({ erro: "error al obtener las ordenes con detalles" });
  }
};
//obtener orden con sus detalles por id
exports.obtenerordencondetallesid = async (req, res) => {
  const { id } = req.params;
  try {
    const datos = await sequelize.query(
      "select * from Vistaordencondetalles where idOrden = :idOrden",
      { replacements: { idOrden: id }, type: sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ mensaje: datos });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la orden con detalles" });
  }
};
