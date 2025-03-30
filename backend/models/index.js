const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

// 📌 Conectar con MySQL
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// 📌 Importar manualmente cada modelo
const models = ["User", "Post", "Like", "Comment"];

models.forEach((modelName) => {
  const model = require(`./${modelName}`)(sequelize, DataTypes);
  db[model.name] = model;
});

// 📌 Asociar modelos si tienen relaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 📌 Exportar base de datos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
