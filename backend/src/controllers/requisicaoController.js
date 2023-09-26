const connection = require('../services/connection');
const { connect } = require('../services/connection');
const requisicaoModel = require('../models/requisicaoModel');


const getAllFromProfessor = async (req, res) => {
    const {professorID} = req.params;
    const requisicao = await requisicaoModel.getAllFromProfessor(professorID);
    return res.status(200).json(requisicao[0]);
};

const getAllFromAluno = async (req, res) => {
    const {alunoID} = req.params;
    const requisicao = await requisicaoModel.getAllFromAluno(alunoID);
    return res.status(200).json(requisicao[0]);
};

const createRequisicao = async (req, res) => {
    const createdRequisicao = await requisicaoModel.createRequisicao(req.body);

    return res.status(201).json(createdRequisicao);
};

const deleteRequisicao = async (req, res) => {
    const {id} = req.params;

    await requisicaoModel.deleteRequisicao(id);
    return res.status(204).json();
};

const updateAula = async (req, res) => {
    const {id} = req.params;

    await aulaModel.updateAula(id,req.body);
    return res.status(204).json();
};

module.exports = {
    getAllFromProfessor,
    getAllFromAluno,
    createRequisicao,
    deleteRequisicao,
};