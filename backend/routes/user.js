const express = require('express');
const router = express.Router(); //permet de créer des routeurs séparés pour chaque route principale de votre application//

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.modifyProfile);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', userCtrl.deleteUser);



module.exports = router;

