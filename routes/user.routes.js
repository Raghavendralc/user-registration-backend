const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/genders', userController.getGenders);

module.exports = router;