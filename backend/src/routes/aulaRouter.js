const express = require('express');
const router = express.Router();

const aulaController = require('../controllers/aulaController');

const aulaMiddleware = require('../middlewares/aulaMiddleware');


router.get('/aula', aulaController.getAll);

router.get('/aula/:id', aulaController.getAulaId);

router.post('/aula', aulaController.createNewAula);

router.delete('/aula/:id', aulaController.deleteAula);

router.put('/aula/:id', aulaController.updateAula);

module.exports = router;
