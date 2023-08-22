const connection = require('./connection');

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

        // const checkIfExistsProfessorQuery = 'SELECT * FROM professor WHERE userID = ?';
        // const [userAlreadyProfessor] = await connection.execute(checkIfExistsProfessorQuery, [userID]);

        // if (userAlreadyProfessor.length === 0 || userAlreadyProfessor[0].isProfessor !== 1) {
        //     return { error: "User already a professor" };
        // }

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
    const removedProf = await connection.execute('DELETE FROM professor WHERE professorID = ?',[id]);

    return removedProf;
}

const updateProf = async (id, prof) => {
    const {certificacoes, dispoHorario, especialidade, experiencia} = prof;
    
    const query = 'UPDATE professor SET certificacoes = ?, dispoHorario = ?, especialidade = ?, experiencia =  ?, WHERE professorID = ?';

    const updatedProf = await connection.execute(query,[certificacoes, dispoHorario, especialidade, experiencia, id]);

    return updatedProf;
}

module.exports = {
    getAll,
    getProfId,
    createNewProf,
    deleteProf,
    updateProf,
};