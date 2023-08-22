const express = require('express');
const router = express.Router();

const treinoController = require('../controllers/treinoController');

const treinoMiddleware = require('../middlewares/treinoMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/treino',jwtMiddleware.verifyJWT, treinoController.getAll);

router.get('/treino/:id', jwtMiddleware.verifyJWT, treinoController.getTreinoId);

router.post('/treino', jwtMiddleware.verifyJWT,treinoMiddleware.validateBody, treinoController.createNewTreino);

router.delete('/treino/:id', jwtMiddleware.verifyJWT, treinoController.deleteTreino);

router.put('/treino/:id', jwtMiddleware.verifyJWT, treinoController.updateTreino);

module.exports = router;
