const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Clientes = sequelize.define('Clientes', {
    idClientes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion_entrega: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Clientes',
    timestamps: false,
});

module.exports = Clientes;
