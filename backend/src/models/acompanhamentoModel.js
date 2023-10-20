const connection = require('../services/connection');

const getAcompanhamentoFromAluno = async (id) => {
    try{
        const acompanhamento = await connection.execute('SELECT pesoAtual from aula WHERE alunoID = ?',[id]);
        return acompanhamento;
    } catch (error) {
        return { error: `Failed to retrieve students: ${error.message}` };
    }
};

module.exports = {
    getAcompanhamentoFromAluno,
};