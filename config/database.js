require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.db_server,
  port: process.env.db_port,
  database: process.env.db_nombre,
  username: process.env.db_usuario,
  password: process.env.db_pass,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida");
  } catch (error) {
    console.error('Error:', error);
  }
})();

module.exports = sequelize;
