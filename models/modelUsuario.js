const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "usuarios",
  {
    idusuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rol_idrol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estados_idestados: {
      type: DataTypes.INTEGER,

      allowNull: true,
      defaultValue: 3, // Por defecto sería pendiente estando en pendiente tienen que validar por correo
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 8],
      },
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    Clientes_idClientes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Verificacion_token: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

Usuario.associate = (models) => {
  Usuario.belongsTo(models.rol, { foreignKey: "rol_idrol", as: "rol" });
  Usuario.belongsTo(models.estados, {
    foreignKey: "estados_idestados",
    as: "estados",
  });
  Usuario.belongsTo(models.clientes, {
    foreignKey: "Clientes_idClientes",
    as: "clientes",
  });
};

module.exports = Usuario;
