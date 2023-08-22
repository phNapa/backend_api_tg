const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professorController');

const professorMiddleware = require('../middlewares/professorMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/prof', jwtMiddleware.verifyJWT, professorController.getAll);

router.get('/prof/:id', jwtMiddleware.verifyJWT, professorController.getProfId);

router.post('/prof', jwtMiddleware.verifyJWT, professorController.createNewProf);

router.delete('/prof/:id', jwtMiddleware.verifyJWT, professorController.deleteProf);

router.put('/prof/:id', jwtMiddleware.verifyJWT, professorController.updateProf);

module.exports = router;
