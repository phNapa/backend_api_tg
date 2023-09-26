const express = require('express');
const router = express.Router();

const requisicaoController = require('../controllers/requisicaoController');

// const requisicaoMiddleware = require('../middlewares/requisicaoMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/requisicao/prof/:id', jwtMiddleware.verifyJWT, requisicaoController.getAllFromProfessor);

router.get('/requisicao/aluno/:id', jwtMiddleware.verifyJWT, requisicaoController.getAllFromAluno);

router.post('/requisicao', jwtMiddleware.verifyJWT, requisicaoController.createRequisicao);

router.delete('/requisicao/:id', jwtMiddleware.verifyJWT, requisicaoController.deleteRequisicao);

module.exports = router;
