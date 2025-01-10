const { json } = require("sequelize");
const sequelize = require("../config/database");

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
    await sequelize.query(
      `EXEC p_NuevaOrdenConDetalles
        @usuarios_idusuarios = :usuarios_idusuarios,
        @estados_idestados = :estados_idestados, 
        @nombre_completo = :nombre_completo, 
        @direccion = :direccion, 
        @telefono = :telefono, 
        @correo_electronico = :correo_electronico, 
        @fecha_entrega = :fecha_entrega,
        @total_orden = :total_orden, 
        @detalles = :detalles`,
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
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error al crear la orden", detalles: error.message });
  }
};


// Actualizando solo la tabla orden
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
      `EXEC p_ActualizarOrden 
      @idOrden = :idOrden,
      @usuarios_idusuarios = :usuarios_idusuarios,
      @estados_idestados = :estados_idestados, 
      @nombre_completo = :nombre_completo, 
      @direccion = :direccion, 
      @telefono = :telefono, 
      @correo_electronico = :correo_electronico, 
      @fecha_entrega = :fecha_entrega,
      @total_orden = :total_orden`,
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

    res.status(200).json({ mensaje: "Orden actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la orden" });
  }
};

// Obtener todas las ordenes con sus detalles
exports.obtenerordencondetalles = async (req, res) => {
  try {
    const datos = await sequelize.query("select * from Vistaordencondetalles", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ mensaje: datos });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las ordenes con detalles" });
  }
};

// Obtener orden con sus detalles por ID
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

// Cambiar el estado de una orden a pendiente
exports.eliminarOrdencondetalles = async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.query(
      `EXEC p_ActualizarEstadoPendiente @idOrden = :idOrden`,
      {
        replacements: { idOrden: id },
      }
    );

    res
      .status(200)
      .json({ mensaje: "Estado de la orden actualizado a 'Pendiente'" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la orden" });
  }
};

// Cambiar el estado de una orden a finalizado
exports.EntregarOrdencondetalles = async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.query(
      `EXEC p_ActualizarEstadoFinalizado @idOrden = :idOrden`,
      {
        replacements: { idOrden: id },
      }
    );

    res
      .status(200)
      .json({ mensaje: "Estado de la orden actualizado a 'Finalizado'" });
  } catch (error) {
    console.error("Error al entregar la orden:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la orden" });
  }
};

