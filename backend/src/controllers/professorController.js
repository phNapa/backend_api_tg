const connection = require('../models/connection');
const { connect } = require('../models/connection');
const professorModel = require('../models/professorModel');

const getAll = async (req, res) => {

    const prof = await professorModel.getAll();

    return res.status(200).json(prof);
};

const getProfId = async (req, res) => {
    const {id} = req.params;
    const prof = await professorModel.getProfId(id);
    return res.status(200).json(prof[0]);
};

const createNewProf = async (req, res) => {
    const createdProf = await professorModel.createNewProf(req.body);

    return res.status(201).json(createdProf);
};

const deleteProf = async (req, res) => {
    const {id} = req.params;

    await professorModel.deleteProf(id);
    return res.status(204).json();
};

const updateProf = async (req, res) => {
    const {id} = req.params;

    await professorModel.updateProf(id,req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getProfId,
    createNewProf,
    deleteProf,
    updateProf,
};