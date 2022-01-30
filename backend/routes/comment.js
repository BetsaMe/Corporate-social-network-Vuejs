const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require("../middleware/auth");

router.post('/',auth, commentCtrl.createComment);
router.get('/',auth, commentCtrl.getAllComments);
router.get('/:id/post',auth, commentCtrl.getCommentsForGivenPost);
router.get('/:id',auth, commentCtrl.getOneComment);
router.put('/:id',auth, commentCtrl.modifyComment);
router.delete('/:id',auth, commentCtrl.deleteComment);


module.exports = router;
