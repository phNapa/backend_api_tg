const connection = require('./connection');

const getAll = async () => {
    try {
        const query = `
            SELECT u.name, a.*
            FROM aluno a
            LEFT JOIN usuario u ON u.userID = a.userID
        `;
        const [alunos] = await connection.execute(query);
        return alunos;
    } catch (error) {
        throw new Error(`Failed to retrieve students: ${error.message}`);
    }
};


const getAlunoId = async (id) => {
    try{
        const aluno = await connection.execute('SELECT u.name, a.* FROM aluno a left join usuario u on u.userID = a.userID WHERE a.alunoID = ?',[id]);
        return aluno;
    } catch (error) {
        return { error: `Failed to retrieve exercicio: ${error.message}` };
    }
};

const createNewAluno = async (aluno) => {
    try {
        const { altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID } = aluno;

        const checkIsProfessorQuery = 'SELECT isProfessor FROM usuario WHERE userID = ?';
        const [checkIsProfessorResult] = await connection.execute(checkIsProfessorQuery, [userID]);

        const isProfessor = checkIsProfessorResult[0]?.isProfessor || 0;

        if (isProfessor === 1) {
            return { message: "User is a professor" };
        } else {
            const insertQuery = `
                INSERT INTO aluno (altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const [createdAluno] = await connection.execute(
                insertQuery,
                [altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID]
            );

            return { insertId: createdAluno.insertId };
        }
    } catch (error) {
        throw new Error(`Failed to create student: ${error.message}`);
    }
};


const deleteAluno = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM aluno WHERE alunoID = ?';
        const [removedAluno] = await connection.execute(deleteQuery, [id]);

        if (removedAluno.affectedRows === 0) {
            return { error: 'Aluno not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete aluno: ${error.message}` };
    }
};


const updateAluno = async (id, aluno) => {
    try {
        const { altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas } = aluno;

        const updateQuery = `
            UPDATE aluno
            SET altura = ?, nivelExperiencia = ?, objetivos = ?, pesoOrigem = ?, prefHorario = ?, restrMedicas = ?
            WHERE alunoID = ?
        `;

        const [updatedAluno] = await connection.execute(
            updateQuery,
            [altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, id]
        );

        if (updatedAluno.affectedRows === 0) {
            return { error: 'Aluno not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update aluno: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getAlunoId,
    createNewAluno,
    deleteAluno,
    updateAluno,
};