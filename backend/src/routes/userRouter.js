const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const userMiddleware = require('../middlewares/userMiddleware');


router.get('/users', userController.getAll);

router.get('/users/:id', userController.getUserId);

router.post('/auth/login', userController.authenticate);

router.post('/users', userMiddleware.validateBody, userController.createNewUser);

router.delete('/users/:id', userController.deleteUser);

router.put('/users/:id', userController.updateUser);

module.exports = router;
