const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const rol = sequelize.define("rol", {
  idrol: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = rol;