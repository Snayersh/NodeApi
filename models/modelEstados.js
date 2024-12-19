const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const estados = sequelize.define('estados',{
    idestados:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:true,
    },
},
{
    tableName: 'estados',
    timestamps: false,
});
module.exports = estados;