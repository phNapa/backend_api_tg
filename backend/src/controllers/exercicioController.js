const connection = require('../models/connection');
const { connect } = require('../models/connection');
const exercicioModel = require('../models/exercicioModel');

const getAll = async (req, res) => {

    const exercicio = await exercicioModel.getAll();

    return res.status(200).json(exercicio);
};

const getExercicioId = async (req, res) => {
    const {id} = req.params;
    const exercicio = await exercicioModel.getExercicioId(id);
    return res.status(200).json(exercicio[0]);
};

const createNewExercicio = async (req, res) => {
    const createdExercicio = await exercicioModel.createNewExercicio(req.body);

    return res.status(201).json(createdExercicio);
};

const deleteExercicio = async (req, res) => {
    const {id} = req.params;

    await exercicioModel.deleteExercicio(id);
    return res.status(204).json();
};

const updateExercicio = async (req, res) => {
    const {id} = req.params;

    await exercicioModel.updateExercicio(id,req.body);
    return res.status(204).json({ message: "Alterado com sucesso!" });
};

module.exports = {
    getAll,
    getExercicioId,
    createNewExercicio,
    deleteExercicio,
    updateExercicio,
};