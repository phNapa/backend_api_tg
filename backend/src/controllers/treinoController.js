const connection = require('../models/connection');
const { connect } = require('../models/connection');
const treinoModel = require('../models/treinoModel');

const getAll = async (req, res) => {

    const treino = await treinoModel.getAll();

    return res.status(200).json(treino);
};

const getTreinoId = async (req, res) => {
    const {id} = req.params;
    const treino = await treinoModel.getTreinoId(id);
    return res.status(200).json(treino[0]);
};

const createNewTreino = async (req, res) => {
    const createdTreino = await treinoModel.createNewTreino(req.body);

    return res.status(201).json(createdTreino);
};

const deleteTreino = async (req, res) => {
    const {id} = req.params;

    await treinoModel.deleteTreino(id);
    return res.status(204).json();
};

const updateTreino = async (req, res) => {
    const {id} = req.params;

    await treinoModel.updateTreino(id,req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getTreinoId,
    createNewTreino,
    deleteTreino,
    updateTreino,
};