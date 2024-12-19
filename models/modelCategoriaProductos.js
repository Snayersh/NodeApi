const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const CategoriaProductos = sequelize.define(
  "CategoriaProductos",
  {
    idCategoriaProductos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuarios_idusuarios: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    nombre :{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    estados_idestados: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW, 
      allowNull: false,
    },
  },
  {
    tableName: "CategoriaProductos",
    timestamps: false,
  }
);

CategoriaProductos.associate  = (models) =>{
    CategoriaProductos.belongsTo(models.usuarios,{foreignKey:'usuarios_idusuarios', as:'usuarios'});
    CategoriaProductos.belongsTo(models.estados,{foreignKey:'estados_idestados',as:'estados'});
}

module.exports = CategoriaProductos;
