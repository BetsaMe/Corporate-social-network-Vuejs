const sequelize = require("../models");
const like = require("../models/like");
const { Op, and } = require("sequelize");

// Like a post
exports.likePost = (req, res) => {

      let thePostId=req.body.postId
      let theUserId=req.body.userId

      sequelize.Like.findOne({where: {postId: thePostId, userId: theUserId}})
      .then((likeFound) => {
        
          if (!likeFound) {   
            
            sequelize.Like.create({          
              islike: req.body.islike,
              userId: req.body.userId,
              postId: req.body.postId,  
            })
              .then((response) => {
                res.json(response);
              })
              .catch((error) => {
                res.status(400).json({ error:error.message});
              });
          } else {
            sequelize.Like.destroy({ where: { id: likeFound.id } })
            .then(() => res.status(200).json({ message: "Like supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
          }
      })
      .catch((error) => {
        res.status(400).json({error:error.message});
      });
      
  };

  
  exports.getLikesCount = (req, res) => {
    const id= req.params.id;

    sequelize.Like.findAll({      
        where:{
          postId:{
            [Op.eq]: id
          }
        }
      })
      .then((likes) => {
        res.json(likes.length);
      })
      .catch((error) => {
        res.status(404).json({
          error: error.message
        });
      });
  };

