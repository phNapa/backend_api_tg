const express = require('express');
const router = express.Router();

const exercicioController = require('../controllers/exercicioController');

const exercicioMiddleware = require('../middlewares/exercicioMiddleware');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/exercicio', jwtMiddleware.verifyJWT, exercicioController.getAll);

router.get('/exercicio/:id', jwtMiddleware.verifyJWT, exercicioController.getExercicioId);

router.post('/exercicio', jwtMiddleware.verifyJWT, exercicioMiddleware.validateBody, exercicioController.createNewExercicio);

router.delete('/exercicio/:id', jwtMiddleware.verifyJWT, exercicioController.deleteExercicio);

router.put('/exercicio/:id', jwtMiddleware.verifyJWT, exercicioController.updateExercicio);

module.exports = router;
