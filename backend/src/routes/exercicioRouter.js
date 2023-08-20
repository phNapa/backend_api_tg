const express = require('express');
const router = express.Router();

const exercicioController = require('../controllers/exercicioController');

const exercicioMiddleware = require('../middlewares/exercicioMiddleware');


router.get('/exercicio', exercicioController.getAll);

router.get('/exercicio/:id', exercicioController.getExercicioId);

router.post('/exercicio', exercicioController.createNewExercicio);

router.delete('/exercicio/:id', exercicioController.deleteExercicio);

router.put('/exercicio/:id', exercicioController.updateExercicio);

module.exports = router;
