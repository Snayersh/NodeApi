const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const OrdenDetalles = sequelize.define(
  "Orden",
  {
    idOrdenDetalles: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Orden_idOrden:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    productos_idProductos:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio:{
        type:DataTypes.DOUBLE,
        allowNull:true,
      },
      subtotal:{
        type:DataTypes.DOUBLE,
        allowNull:true,
      }, },

  {
    tableName: "OrdenDetalles",
    timestamps: false,
  }
);

OrdenDetalles.associate = (models) => {
  OrdenDetalles.belongsTo(models.Orden, {
    foreignKey: "Orden_idOrden",
    as: "Orden",
  });
  OrdenDetalles.belongsTo(models.Productos, {
    foreignKey: "Productos_idProductos",
    as: "Productos",
  });s
};

module.exports = OrdenDetalles;
