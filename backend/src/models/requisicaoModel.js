const connection = require('../services/connection');

const getAllFromProfessor = async (professorID) => {
    try {
        const query = 'SELECT * FROM requisicao WHERE professorID = ?';
        const [requisicao] = await connection.execute(query, [professorID]);
        return requisicao;
    } catch (error) {
        throw new Error(`Failed to retrieve aulas: ${error.message}`);
    }
};

const getAllFromAluno = async (alunoID) => {
    try {
        const query = 'SELECT * FROM requisicao WHERE alunoID = ?';
        const [requisicao] = await connection.execute(query, [alunoID]);
        return requisicao;
    } catch (error) {
        throw new Error(`Failed to retrieve aulas: ${error.message}`);
    }
};

const createRequisicao = async (req) => {
    try {
        const { alunoID, professorID, requisicao} = req;

        const insertQuery = `
            INSERT INTO requisicao (alunoID, professorID, requisicao)
            VALUES (?, ?, ?)
        `;

        const [createdRequisicao] = await connection.execute(
            insertQuery,
            [alunoID, professorID, requisicao]
        );

        return { insertId: createdRequisicao.insertId };
    } catch (error) {
        throw new Error(`Failed to create aula: ${error.message}`);
    }
};


const deleteRequisicao = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM requisicao WHERE id = ?';
        const [removedRequisicao] = await connection.execute(deleteQuery, [id]);

        if (removedRequisicao.affectedRows === 0) {
            return { error: 'Requisicao not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete aula: ${error.message}` };
    }
};


const updateRequisicao = async (id, aula) => {
    try {
        const { dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo } = aula;

        const updateQuery = `
            UPDATE aula
            SET dataAula = ?, dificuldades = ?, duracao = ?, horario = ?, localo = ?, pesoAtual = ?, titulo = ?
            WHERE aulaID = ?
        `;

        const [updatedAula] = await connection.execute(
            updateQuery,
            [dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo, id]
        );

        if (updatedAula.affectedRows === 0) {
            return { error: 'Aula not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update aula: ${error.message}` };
    }
};


module.exports = {
    getAllFromProfessor,
    getAllFromAluno,
    createRequisicao,
    deleteRequisicao,
};