const express = require('express');
const router = express.Router();

const acompanhamentoController = require('../controllers/acompanhamentoController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/acompanhamento/:id',jwtMiddleware.verifyJWT, acompanhamentoController.getAcompanhamentoFromAluno);

module.exports = router;
