const connection = require('./connection');

const getAll = async () => {
    const [prof] = await connection.execute('SELECT u.name, p.* FROM professor p left join usuario u on u.userID = p.userID');
    return prof;
};

const getProfId = async (id) => {
    const prof = await connection.execute('SELECT u.name, p.* FROM professor p left join usuario u on u.userID = p.userID WHERE p.professorID = ?',[id]);
    return prof;
};

const createNewProf = async (prof) => {
    const {certificacoes, dispoHorario, especialidade, experiencia, userID} = prof;

    const checkIsProfessor = await connection.execute('SELECT isProfessor FROM usuario WHERE userID = ?',[userID])

    if (checkIsProfessor[0] == '0'){
        return {message: "user is not professor"}
    }else{
        const query = 'INSERT INTO professor (certificacoes, dispoHorario, especialidade, experiencia, userID) VALUES (?, ?, ?, ?, ?)';

        const [createdProf] = await connection.execute(query,[certificacoes, dispoHorario, especialidade, experiencia, userID]);

        return {insertId: createdProf.insertId};
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