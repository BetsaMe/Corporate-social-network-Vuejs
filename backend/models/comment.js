'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'userId' })
      Comment.belongsTo(models.Post, { onDelete: 'cascade', foreignKey: 'postId' })
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
