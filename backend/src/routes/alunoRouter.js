const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

const alunoMiddleware = require('../middlewares/alunoMiddleware');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/aluno',jwtMiddleware.verifyJWT, alunoController.getAll);

router.get('/aluno/:id', jwtMiddleware.verifyJWT, alunoController.getAlunoId);

router.get('/aluno/prof/:id', jwtMiddleware.verifyJWT, alunoController.getProfAlunos);

router.post('/aluno', alunoMiddleware.validateBody, alunoController.createNewAluno);

router.delete('/aluno/:id', jwtMiddleware.verifyJWT, alunoController.deleteAluno);

router.put('/aluno/:id', jwtMiddleware.verifyJWT, alunoController.updateAluno);

module.exports = router;
