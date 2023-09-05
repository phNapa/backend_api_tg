const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const userMiddleware = require('../middlewares/userMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router.get('/users', jwtMiddleware.verifyJWT, userController.getAll);

router.get('/users/:id', jwtMiddleware.verifyJWT, userController.getUserId);

router.post('/auth/login', userController.authenticate);

router.post('/user', userController.createUserCredentials);

router.post('/userDetails', jwtMiddleware.verifyJWT, userController.createNewUser);

router.delete('/users/:id', jwtMiddleware.verifyJWT, userController.deleteUser);

router.put('/users/:id', jwtMiddleware.verifyJWT, userController.updateUser);

module.exports = router;
