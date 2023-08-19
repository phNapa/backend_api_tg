const connection = require('./connection');

const getAll = async () => {
    const [aula] = await connection.execute('SELECT * FROM aula');
    return aula;
};

const getAulaId = async (id) => {
    const aula = await connection.execute('SELECT * FROM aula WHERE aulaID = ?',[id]);
    return aula;
};

const createNewAula = async (aula) => {
    const {dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo} = aula;

    const query = 'INSERT INTO aula (dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const [createdAula] = await connection.execute(query,[dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo]);

    return {insertId: createdAula.insertId};
    
};

const deleteAula = async (id) => {
    const removedAula = await connection.execute('DELETE FROM aula WHERE aulaID = ?',[id]);

    return removedAula;
}

const updateAula = async (id, aula) => {
    const {dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo} = aula;
    
    const query = 'UPDATE aula SET dataAula = ?, dificuldades = ?, duracao = ?, horario =  ?, localo = ?, pesoAtual = ?, titulo = ? WHERE aulaID = ?';

    const updatedAula = await connection.execute(query,[dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo, id]);

    return updatedAula;
}

module.exports = {
    getAll,
    getAulaId,
    createNewAula,
    deleteAula,
    updateAula,
};