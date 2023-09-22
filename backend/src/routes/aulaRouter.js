const express = require('express');
const router = express.Router();

const aulaController = require('../controllers/aulaController');

const aulaMiddleware = require('../middlewares/aulaMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/aula', jwtMiddleware.verifyJWT, aulaController.getAll);

router.get('/aula/:id', jwtMiddleware.verifyJWT, aulaController.getAulaId);

router.get('/aula/user/:id', jwtMiddleware.verifyJWT, aulaController.getAulaUser);

router.post('/aula', jwtMiddleware.verifyJWT, aulaMiddleware.validateBody, aulaController.createNewAula);

router.delete('/aula/:id', jwtMiddleware.verifyJWT, aulaController.deleteAula);

router.put('/aula/:id', jwtMiddleware.verifyJWT, aulaController.updateAula);

module.exports = router;
