const { where } = require("sequelize");

const CategoriaP = requiere("../models/modelCategoriaProductos.js");

//Registrar una categoria producto
exports.registrarcategoria = async (req, res) => {
  const { usuaiors_idusuarios, nombre, estados_idestados } = req.body;

  try {
    await CategoriaP.create({ usuaiors_idusuarios, nombre, estados_idestados });
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
    res.status(200).json({ categoria });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener todas las categorias de los productos",
      });
  }
};

//Obtener categorias por id
exports.obtenercategoriaid = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaP.findOne({
      where: { idCategoriaProductos: id },
    });
    if (!categoria) {
      return res.status(404).json({ error: "Categoria no encontrada" });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoria por id" });
  }
};

exports.actualizarcategoria = async (req, res) => {
  const { id } = req.params;
  const { usuaiors_idusuarios, nombre, estados_idestados } = req.body;

  try {
    const categoria = await CategoriaP.findOne({
      where: { idCategoriaProductos: id },
    });
    if (!categoria) {
      return res.status(400).json({ error: "categoria no encontrada" });
    }
    if (usuaiors_idusuarios)
      categoria.usuaiors_idusuarios = usuaiors_idusuarios;
    if (nombre) categoria.nombre = nombre;
    if (estados_idestados) categoria.estados_idestados = estados_idestados;
    await categoria.save();
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
      return res.statu(400).json({ mensaje: "Categorina no encontrada" });
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
