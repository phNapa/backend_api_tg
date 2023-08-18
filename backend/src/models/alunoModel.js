const connection = require('./connection');

const getAll = async () => {
    const [aluno] = await connection.execute('SELECT u.name, a.* FROM aluno a left join usuario u on u.userID = a.userID');
    return aluno;
};

const getAlunoId = async (id) => {
    const aluno = await connection.execute('SELECT u.name, a.* FROM aluno a left join usuario u on u.userID = a.userID WHERE u.userID = ?',[id]);
    return aluno;
};

const createNewAluno = async (aluno) => {
    const {altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID} = aluno;

    const query = 'INSERT INTO aluno (altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const [createdAluno] = await connection.execute(query,[altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID]);

    return {insertId: createdAluno.insertId};
};

const deleteAluno = async (id) => {
    const removedAluno = await connection.execute('DELETE FROM aluno WHERE alunoID = ?',[id]);

    return removedAluno;
}

const updateAluno = async (id, aluno) => {
    const {altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas} = aluno;
    
    const query = 'UPDATE aluno SET altura = ?, nivelExperiencia = ?, objetivos = ?, pesoOrigem = ?, prefHorario = ?, restrMedicas = ? WHERE alunoID = ?';

    const updatedAluno = await connection.execute(query,[altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, id]);

    return updatedAluno;
}

module.exports = {
    getAll,
    getAlunoId,
    createNewAluno,
    deleteAluno,
    updateAluno,
};