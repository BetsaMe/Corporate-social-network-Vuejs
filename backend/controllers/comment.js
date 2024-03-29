const sequelize = require("../models");

// Chercher tous les commentaires
exports.getAllComments = (req, res) => {
  sequelize.Comment.findAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Création d'un commentaire
exports.createComment = (req, res) => {
  const post = sequelize.Post.findByPk(req.body.postId);
  const user = sequelize.User.findByPk(req.body.userId);
  Promise.all([post, user])
    .then((values) => {
      if (values[0] === null) {
        //post
        throw "Le post donné n'existe pas";
      } else if (values[1] === null) {
        //user
        throw "L'utilisateur donné n'existe pas";
      } else {
        sequelize.Comment.create({          
          content: req.body.content,
          authorName: req.body.authorName,
          userId: values[1].id,
          postId: values[0].id,
        })
          .then((comment) => {
            res.json(comment);
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Lire un commentaire

exports.getOneComment = (req, res) => {
  sequelize.Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        throw "Le commentaire demandé n'existe pas";
      } else {
        res.json(comment);
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Modifier un commentaire

exports.modifyComment = (req, res) => {
  sequelize.Comment.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Supprimer un commentaire

exports.deleteComment = (req, res) => {
  sequelize.Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        throw "Le commentaire demandé n'existe pas";
      } else {
        res.json(result);
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getCommentsForGivenPost = (req, res) => {
  sequelize.Comment.findAll({
    where: {
      postId: req.params.id,
    },
  })
    .then((commentsForGivenPost) => {
      res.json(commentsForGivenPost);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
