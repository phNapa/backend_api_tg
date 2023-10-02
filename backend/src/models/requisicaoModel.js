const connection = require('../services/connection');

const getAllFromProfessor = async (id) => {
    try {
        const query = 'SELECT re.*, u.name, u.contato, u.cidade FROM requisicao re LEFT JOIN aluno al on al.alunoID=re.alunoID LEFT JOIN usuario u on u.userID=al.userID WHERE re.professorID = ? order by id desc';
        const [requisicao] = await connection.execute(query,[id]);
        return {
            data: requisicao
        };
    } catch (error) {
        throw new Error(`Failed to retrieve: ${error.message}`);
    }
};

const getAllFromAluno = async (id) => {
    try {
        const query = 'SELECT * FROM requisicao WHERE alunoID = ?';
        const [requisicao] = await connection.execute(query, [id]);
        return {
            data: requisicao
        };
    } catch (error) {
        throw new Error(`Failed to retrieve: ${error.message}`);
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
        throw new Error(`Failed to create: ${error.message}`);
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
        return { error: `Failed to delete: ${error.message}` };
    }
};


const putAceitarRequisicao = async (id) => {
    try {

        const updateQuery = `
            UPDATE requisicao
            SET aceito = 1
            WHERE id = ?
        `;

        const [aceitarReq] = await connection.execute(
            updateQuery,
            [id]
        );

        if (aceitarReq.affectedRows === 0) {
            return { error: 'Requisicao not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update: ${error.message}` };
    }
};


module.exports = {
    getAllFromProfessor,
    getAllFromAluno,
    createRequisicao,
    deleteRequisicao,
    putAceitarRequisicao,
};