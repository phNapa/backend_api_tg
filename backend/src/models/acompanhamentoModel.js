const connection = require('../services/connection');

const getAcompanhamentoFromAluno = async (id) => {
    try{
        const acompanhamento = await connection.execute('SELECT a.pesoAtual, al.altura from aula a LEFT JOIN aluno al on al.alunoID = a.alunoID WHERE a.alunoID = ?',[id]);
        return acompanhamento;
    } catch (error) {
        return { error: `Failed to retrieve students: ${error.message}` };
    }
};

module.exports = {
    getAcompanhamentoFromAluno,
};