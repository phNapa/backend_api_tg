const express = require('express');
const router = express.Router();

const treinoController = require('../controllers/treinoController');

const treinoMiddleware = require('../middlewares/treinoMiddleware');


router.get('/treino', treinoController.getAll);

router.get('/treino/:id', treinoController.getTreinoId);

router.post('/treino', treinoController.createNewTreino);

router.delete('/treino/:id', treinoController.deleteTreino);

router.put('/treino/:id', treinoController.updateTreino);

module.exports = router;
