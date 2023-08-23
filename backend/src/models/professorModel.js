const connection = require('../services/connection');

const getAll = async () => {
    try {
        const query = `
            SELECT u.name, p.*
            FROM professor p
            LEFT JOIN usuario u ON u.userID = p.userID
        `;
        const [professors] = await connection.execute(query);
        return professors;
    } catch (error) {
        return { error: `Failed to retrieve professor: ${error.message}` };
    }
};


const getProfId = async (id) => {
    try{
    const prof = await connection.execute('SELECT u.name, p.* FROM professor p left join usuario u on u.userID = p.userID WHERE p.professorID = ?',[id]);
    return prof;
    } catch (error) {
        return { error: `Failed to retrieve professor: ${error.message}` };
    }
};

const createNewProf = async (prof) => {
    try {
        const { certificacoes, dispoHorario, especialidade, experiencia, userID } = prof;

        const checkIsProfessorQuery = 'SELECT isProfessor FROM usuario WHERE userID = ?';
        const [userIsProfessor] = await connection.execute(checkIsProfessorQuery, [userID]);

        if (userIsProfessor.length === 0 || userIsProfessor[0].isProfessor !== 1) {
            return { error: "User is not a professor" };
        }

        const checkIfExistsProfessorQuery = 'SELECT * FROM professor WHERE userID = ?';
        const [userAlreadyProfessor] = await connection.execute(checkIfExistsProfessorQuery, [userID]);

        if (userAlreadyProfessor != '') {
            return { error: "User already a professor" };
        }

        const insertQuery = `
            INSERT INTO professor (certificacoes, dispoHorario, especialidade, experiencia, userID)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [createdProfessor] = await connection.execute(insertQuery, [certificacoes, dispoHorario, especialidade, experiencia, userID]);

        return { insertId: createdProfessor.insertId };
    } catch (error) {
        return { error: `Failed to create professor: ${error.message}` };
    }
};



const deleteProf = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM professor WHERE professorID = ?';
        const [removedProfessor] = await connection.execute(deleteQuery, [id]);

        if (removedProfessor.affectedRows === 0) {
            return { error: 'Professor not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete professor: ${error.message}` };
    }
};


const updateProf = async (id, prof) => {
    try {
        const { certificacoes, dispoHorario, especialidade, experiencia } = prof;

        const updateQuery = `
            UPDATE professor
            SET certificacoes = ?, dispoHorario = ?, especialidade = ?, experiencia = ?
            WHERE professorID = ?
        `;

        const [updatedProf] = await connection.execute(updateQuery, [certificacoes, dispoHorario, especialidade, experiencia, id]);

        if (updatedProf.affectedRows === 0) {
            return { error: 'Professor not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update professor: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getProfId,
    createNewProf,
    deleteProf,
    updateProf,
};