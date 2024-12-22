const { Op } = require("sequelize");
const Productos = require("../models/modelProductos");

//Registrar un nuevo producto
exports.registrarproducto = async (req, res) => {
  const {
    CategoriaProductos_idCategoriaProducto,
    usuario_idusuario,
    nombre,
    marca,
    codigo,
    stock,
    estados_idestados,
    precio,
    foto,
  } = req.body;

  try {
    await Productos.create({
      CategoriaProductos_idCategoriaProducto,
      usuario_idusuario,
      nombre,
      marca,
      codigo,
      stock,
      estados_idestados,
      precio,
      foto,
    });
    res.status(201).json({ mensaje: "Producto registrado con exito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar un nuevo producto" });
  }
};

//obtener todos los productos
exports.obtenerproductos = async (req, res) => {
  try {
    const productos = await Productos.findAll();
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los productos" });
  }
};
//obtener producto por nombre
exports.obtenerproductonombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    if (!nombre) {
      return res.status(400).json({ error: "Ingresa un nombre del producto" });
    }
    const productos = await Productos.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${nombre}%` } },
          { marca: { [Op.like]: `%${nombre}%` } },
        ],
      },
    });
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto por id" });
  }
};

//Actualizar un producto
exports.actualizarproducto = async (req, res) => {
  const { id } = req.params;
  const {
    CategoriaProductos_idCategoriaProducto,
    usuario_idusuario,
    nombre,
    marca,
    codigo,
    stock,
    estados_idestados,
    precio,
    foto,
  } = req.body;
  try {
    const productos = await Productos.findOne({ where: { idProdcutos: id } });
    if (!productos) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }
    if (CategoriaProductos_idCategoriaProducto)
      productos.CategoriaProductos_idCategoriaProducto =
        CategoriaProductos_idCategoriaProducto;
    if (usuario_idusuario) productos.usuario_idusuario = usuario_idusuario;
    if (nombre) productos.nombre = nombre;
    if (marca) productos.marca = marca;
    if (codigo) productos.codigo = codigo;
    if (stock) productos.stock = stock;
    if (estados_idestados) productos.estados_idestados = estados_idestados;
    if (precio) productos.precio = precio;
    if (foto) productos.foto = foto;
    await productos.save();
    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

//eliminar producto de manera logica
exports.eliminarproducto = async (req, res) => {
  const { id } = req.params;
  const estados_idestados = 2;
  try {
    const producto = await Productos.findOne({ where: { idProdcutos: id } });
    if (!producto) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }
    producto.estados_idestados = estados_idestados;
    await producto.save();
    res
      .status(200)
      .json({ mensaje: "Producto eliminado inactivado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al inactivar el producto" });
  }
};
