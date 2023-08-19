const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professorController');

const professorMiddleware = require('../middlewares/professorMiddleware');


router.get('/prof', professorController.getAll);

router.get('/prof/:id', professorController.getProfId);

router.post('/prof', professorController.createNewProf);

router.delete('/prof/:id', professorController.deleteProf);

router.put('/prof/:id', professorController.updateProf);

module.exports = router;
