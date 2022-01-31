const Post = require('.././models')
const User = require('../models/user');
const sequelize = require("../models");

// HOME /Chercher tous les posts

exports.getAllPosts = (req, res, next) => {
    sequelize.Post.findAll().then(posts => {
        res.json(posts);
    }).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
    );
};

// Création d'un post

exports.createPost=(req, res, next) =>{
    sequelize.Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      userName: req.body.userName
    }).then(post =>{
      res.json(post);
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
      });
    }
  );
};

// Lire un post

exports.getOnePost=(req, res, next)=>{
    sequelize.Post.findByPk(req.params.id).then((post)=>{
        if(post === null){
            throw "L'article demandé n'existe pas";
        } else {
         res.json(post);
        }
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
  );
};

// Modifier un post

exports.modifyPost=(req, res, next)=>{
    sequelize.Post.update({
    title: req.body.title,
    content: req.body.content
    }, {
    where: {
        id: req.params.id
    }
    }).then(result => {
    res.json(result);
    }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};

// Supprimer un post

exports.deletePost=(req, res, next)=>{
    sequelize.Post.destroy({
    where: {
        id: req.params.id
    }
    }).then(result => {
      if(!result){
          throw "L'article demandé n'existe pas";
      } else {
          res.json(result);
      }
    }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};
