const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const Productos = sequelize.define(
  "Productos",
  {
    idProdcutos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    CategoriaProductos_idCategoriaProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    usuario_idusuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estados_idestados: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    foto: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  },

  {
    tableName: "Productos",
    timestamps: false,
  }
);

Productos.associate = (models) => {
  Productos.belongsTo(models.categoriaProductos, {
    foreignKey: "CategoriaProductos_idCategoriaProducto",
    as: "CategoriaProductos",
  });
  Productos.belongsTo(models.usuarios, {
    foreignKey: "usuarios_idusuarios",
    as: "usuarios",
  });
  Productos.belongsTo(models.estados, {
    foreignKey: "estados_idestados",
    as: "estados",
  });
};

module.exports = Productos;
