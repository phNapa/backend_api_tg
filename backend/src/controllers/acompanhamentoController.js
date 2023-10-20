const connection = require('../services/connection');
const { connect } = require('../services/connection');
const acompanhamentoModel = require('../models/acompanhamentoModel');

const getAcompanhamentoFromAluno = async (req, res) => {
    const {id} = req.params;
    const acompanhamento = await acompanhamentoModel.getAcompanhamentoFromAluno(id);
    return res.status(200).json(acompanhamento[0]);
};

module.exports = {
    getAcompanhamentoFromAluno,
};