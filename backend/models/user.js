'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { onDelete: 'CASCADE' })
      User.hasMany(models.Comment)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin:{type: DataTypes.BOOLEAN, defaultValue: false} //rajouté
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
