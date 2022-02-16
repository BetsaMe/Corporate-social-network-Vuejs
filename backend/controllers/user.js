const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const req = require('express/lib/request');
const User = require('../models/user');
const sequelize = require("../models");


// SIGNUP
exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        sequelize.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error: error }));
};

// LOGIN
exports.login = (req, res, next) => {
    sequelize.User.findOne({
        where: { email: req.body.email}
    }).then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              user: user,
              id: user.id,
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// MODIFICATION USER

exports.modifyProfile=(req, res, next)=>{
    sequelize.User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName
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



// LIRE UN UTILISATEUR
exports.getOneUser=(req, res, next)=>{
  sequelize.User.findByPk(req.params.id,
  ).then(user=>{
    res.json(user);
  }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



// SUPPRIMER UN UTILISATEUR
exports.deleteUser=(req, res, next)=>{
  sequelize.User.destroy({
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
