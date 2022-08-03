const sequelize = require("../models");
const fs = require("fs");

// HOME /Récupérer tous les posts

exports.getAllPosts = (req, res) => {
  sequelize.Post.findAll({ order: [['updatedAt', 'DESC']]})
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Création du post

exports.createPost = (req, res) => {
  let fileURL = `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`;
  sequelize.Post.create({
    image: fileURL,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    authorName: req.body.authorName,
  })
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Lire un post

exports.getOnePost = (req, res) => {
  sequelize.Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        throw "L'article demandé n'existe pas";
      } else {
        res.json(post);
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Modifier un post

exports.modifyPost = (req, res) => {
  const editedPost = req.file
    ? {
        title: req.body.title,
        content: req.body.content,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        title: req.body.title,
        content: req.body.content,
      };
  sequelize.Post.update(
    {
      ...editedPost,
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

// Supprimer un post

exports.deletePost = (req, res) => {
  sequelize.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sequelize.Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Message supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
};

