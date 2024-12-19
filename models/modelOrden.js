const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const Orden = sequelize.define(
  "Orden",
  {
    idOrden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    usuarios_idusuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    estados_idestados: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },

    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 8],
      },
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_orden: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },

  {
    tableName: "Orden",
    timestamps: false,
  }
);

Orden.associate = (models) => {
  Orden.belongsTo(models.usuarios, {
    foreignKey: "usuarios_idusuarios",
    as: "usuarios",
  });
  Orden.belongsTo(models.estados, {
    foreignKey: "estados_idestados",
    as: "estados",
  });
};

module.exports = Orden;
