const CategoriaP = require("../models/modelCategoriaProductos.js");
const sequelize = require("../config/database")
const Producto = require("../models/modelProductos.js")


exports.registrarcategoria = async (req, res) => {
  const { usuarios_idusuarios, nombre, estados_idestados } = req.body;

  try {
    await sequelize.query(
      `	Exec p_insertarCategoriaProductos              
       @usuarios_idusuarios = :usuarios_idusuarios,
      @nombre = :nombre,
      @estados_idestados = :estados_idestados
      `,
      {
        replacements: { usuarios_idusuarios, nombre, estados_idestados },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    res
      .status(201)
      .json({ mensaje: "Categoria del producto registrada con exito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al registrar una categoria del producto" });
  }
};

//Obtener todas las categorias de los productos
exports.obtenercategoria = async (req, res) => {
  try {
    const categoria = await CategoriaP.findAll();
    res.status(200).json( categoria );
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener todas las categorias de los productos",
    });
  }
};

//Obtener categorias por id
exports.obtenerCategoriaConProductos = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaP.findOne({
      where: { idCategoriaProductos: id },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    const productos = await Producto.findAll({
      where: { CategoriaProductos_idCategoriaProducto: id }, 
    });

    res.status(200).json({
      categoria,
      productos, 
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría y productos" });
  }
};


exports.actualizarcategoria = async (req, res) => {
  const { id } = req.params;
  const { usuarios_idusuarios, nombre, estados_idestados } = req.body;

  try {
    const [categoria] = await sequelize.query(
      `Exec p_actualizarCategoriaproductos 
        @idCategoriaProductos = :idCategoriaProductos
        @usuarios_idusuarios =:usuarios_idusuarios ,
        @nombre = :nombre,
        @estados_idestados = :estados_idestados`,
      {
        replacements: {
          idCategoriaProductos: id,
          usuarios_idusuarios,
          nombre,
          estados_idestados,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    if (!categoria) {
      return res.status(400).json({ error: "categoria no encontrada" });
    }
    res.status(200).json({ mensaje: "Categoria Actualizada correctamente" });
  } catch (error) {
    res.statu(500).json({ error: "Error al actaulizar la categoria" });
  }
};

//Eliminar de manera logica una categoria volviendolo inactivo
exports.eliminarcategoria = async (req, res) => {
  const { id } = req.params;
  const estados_idestados = 2; //inactivar
  try {
    const categoria = await CategoriaP.findOne({
      where: { idCategoriaProductos: id },
    });
    if (!categoria) {
      return res.status(400).json({ mensaje: "Categorina no encontrada" });
    }
    categoria.estados_idestados = estados_idestados;
    await categoria.save();
    res.status(200).json({ mensaje: "Categoria eliminada correctamente" });
  } catch (error) {
    res
      .statu(500)
      .json({ error: "Error al eliminar la categoria del producto" });
  }
};
