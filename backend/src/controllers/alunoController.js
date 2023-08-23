const connection = require('../services/connection');
const { connect } = require('../services/connection');
const alunoModel = require('../models/alunoModel');

const getAll = async (req, res) => {

    const aluno = await alunoModel.getAll();

    return res.status(200).json(aluno);
};

const getAlunoId = async (req, res) => {
    const {id} = req.params;
    const aluno = await alunoModel.getAlunoId(id);
    return res.status(200).json(aluno[0]);
};

const createNewAluno = async (req, res) => {
    const createdAluno = await alunoModel.createNewAluno(req.body);

    return res.status(201).json(createdAluno);
};

const deleteAluno = async (req, res) => {
    const {id} = req.params;

    await alunoModel.deleteAluno(id);
    return res.status(204).json();
};

const updateAluno = async (req, res) => {
    const {id} = req.params;

    await alunoModel.updateAluno(id,req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getAlunoId,
    createNewAluno,
    deleteAluno,
    updateAluno,
};