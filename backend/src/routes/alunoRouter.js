const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

const alunoMiddleware = require('../middlewares/alunoMiddleware');


router.get('/aluno', alunoController.getAll);

router.get('/aluno/:id', alunoController.getAlunoId);

router.post('/aluno', alunoController.createNewAluno);

router.delete('/aluno/:id', alunoController.deleteAluno);

router.put('/aluno/:id', alunoController.updateAluno);

module.exports = router;
