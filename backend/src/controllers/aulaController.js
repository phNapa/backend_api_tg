const connection = require('../services/connection');
const { connect } = require('../services/connection');
const aulaModel = require('../models/aulaModel');

const getAll = async (req, res) => {

    const aula = await aulaModel.getAll();

    return res.status(200).json(aula);
};

const getAulaId = async (req, res) => {
    const {id} = req.params;
    const aula = await aulaModel.getAulaId(id);
    return res.status(200).json(aula[0]);
};

const getAulaUser = async (req, res) => {
    const {id} = req.params;
    const aula = await aulaModel.getAulaUser(id);
    return res.status(200).json(aula);
};

const createNewAula = async (req, res) => {
    const createdAula = await aulaModel.createNewAula(req.body);

    return res.status(201).json(createdAula);
};

const deleteAula = async (req, res) => {
    const {id} = req.params;

    await aulaModel.deleteAula(id);
    return res.status(204).json();
};

const updateAula = async (req, res) => {
    const {id} = req.params;

    await aulaModel.updateAula(id,req.body);
    return res.status(204).json();
};

const finalizarAula = async (req, res) => {
    const {id} = req.params;

    await aulaModel.finalizarAula(id,req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getAulaId,
    createNewAula,
    deleteAula,
    updateAula,
    getAulaUser,
    finalizarAula,
};