const { Op, where } = require("sequelize");
const Productos = require("../models/modelProductos");
const sequelize = require('../config/database')

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
    const fotoBinaria = foto ? Buffer.from(foto, "base64") : null;

    if (fotoBinaria && fotoBinaria.length > 10 * 1024 * 1024) {
      return res
        .status(400)
        .json({ error: "La imagen supera el tamaño máximo permitido de 10MB." });
    }

    await sequelize.query(
      `EXEC p_insertarProductos 
        @CategoriaProductos_idCategoriaProducto = :CategoriaProductos_idCategoriaProducto,
        @usuario_idusuario = :usuario_idusuario,
        @nombre = :nombre,
        @marca = :marca,
        @codigo = :codigo,
        @stock = :stock,
        @estados_idestados = :estados_idestados,
        @precio = :precio,
        @foto = :foto`, 
      {
        replacements: {
          CategoriaProductos_idCategoriaProducto,
          usuario_idusuario,
          nombre,
          marca,
          codigo,
          stock,
          estados_idestados,
          precio,
          foto: fotoBinaria,  
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ mensaje: "Producto registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar el producto:", error); 
    res.status(500).json({ error: `Error al registrar un nuevo producto: ${error.message}` });
  }
};


//obtener todos los productos
exports.obtenerproductos = async (req, res) => {
  try {
    const productos = await Productos.findAll();
    
    const productosConFoto = productos.map(producto => ({
      ...producto.toJSON(),
      foto: producto.foto ? `data:image/jpeg;base64,${producto.foto}` : null,
    }));

    res.status(200).json(productosConFoto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los productos" });
  }
};

// Obtener un producto por id
exports.obtenerproductoid = async (req, res) => {
  const { id } = req.params;
  
  try {
    const producto = await Productos.findOne({
      where: { idProdcutos: id },
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const productoConFoto = {
      ...producto.toJSON(),
      foto: producto.foto ? `data:image/jpeg;base64,${producto.foto}` : null,
    };

    res.status(200).json(productoConFoto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto por id" });
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
    res.status(200).json( productos );
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
    const [resultado] = await sequelize.query(
      `EXEC p_actualizarproductos 
       @idProductos = :idProductos,
       @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProducto,
       @usuario_idusuario = :usuario_idusuario,
       @nombre = :nombre,
       @marca = :marca,
       @codigo = :codigo,
       @stock = :stock,
       @estados_idestados = :estados_idestados,
       @precio = :precio,
       @foto = :foto`,
      {
        replacements: {
          idProductos: id,
          CategoriaProductos_idCategoriaProducto,
          usuario_idusuario,
          nombre,
          marca,
          codigo,
          stock,
          estados_idestados,
          precio,
          foto,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (!resultado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
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
