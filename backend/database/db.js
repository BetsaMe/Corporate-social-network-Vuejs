const {Sequelize}= require('sequelize');
const {database}= require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect:"mysql"
    }
);

// codigo agregado
sequelize
  .authenticate()
  .then(() => console.log("Conexión a MySQL exitosa"))
  .catch((err) => console.error("Error al conectar con MySQL:", err));

console.log("📌 Modelos detectados por Sequelize:", sequelize.models);


module.exports= sequelize;