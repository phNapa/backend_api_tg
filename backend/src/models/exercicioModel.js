const connection = require('./connection');

const getAll = async () => {
    const [exercicio] = await connection.execute('SELECT * FROM exercicios');
    return exercicio;
};

const getExercicioId = async (id) => {
    const exercicio = await connection.execute('SELECT * FROM exercicios where exercicioID = ?',[id]);
    return exercicio;
};

const createNewExercicio = async (exercicio) => {
    const {nome} = exercicio;

    const query = 'INSERT INTO exercicios (nome) VALUES (?)';

    const [createdExercicio] = await connection.execute(query,[nome]);

    return {insertId: createdExercicio.insertId};
    
};

const deleteExercicio = async (id) => {
    const removedExercicio = await connection.execute('DELETE FROM exercicios WHERE exercicioID = ?',[id]);

    return removedExercicio;
}

const updateExercicio = async (id, exercicio) => {
    const {nome} = exercicio;
    
    const query = 'UPDATE exercicios SET nome = ? WHERE exercicioID = ?';

    const updatedExercicio = await connection.execute(query,[nome, id]);

    return updatedExercicio;
}

module.exports = {
    getAll,
    getExercicioId,
    createNewExercicio,
    deleteExercicio,
    updateExercicio,
};