'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, {
        onDelete: "cascade",
        foreignKey: "userId",
      });
      Like.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: "postId",
      });
    }
  }
  Like.init({
    islike:DataTypes.STRING
   }, 
  {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};