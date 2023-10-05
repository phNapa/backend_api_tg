const connection = require('../services/connection');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM exercicios order by nome asc';
        const [exercicios] = await connection.execute(query);
        return exercicios;
    } catch (error) {
        throw new Error(`Failed to retrieve exercises: ${error.message}`);
    }
};


const getExercicioId = async (id) => {
    try{
        const exercicio = await connection.execute('SELECT * FROM exercicios where exercicioID = ?',[id]);
        return exercicio;
    } catch (error) {
        return { error: `Failed to retrieve exercicio: ${error.message}` };
    }
};

const createNewExercicio = async (exercicio) => {
    try {
        const { nome } = exercicio;

        const insertQuery = 'INSERT INTO exercicios (nome) VALUES (?)';

        const [createdExercicio] = await connection.execute(insertQuery, [nome]);

        return { insertId: createdExercicio.insertId };
    } catch (error) {
        throw new Error(`Failed to create exercicio: ${error.message}`);
    }
};


const deleteExercicio = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM exercicios WHERE exercicioID = ?';
        const [removedExercicio] = await connection.execute(deleteQuery, [id]);

        if (removedExercicio.affectedRows === 0) {
            return { error: 'Exercicio not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete exercicio: ${error.message}` };
    }
};


const updateExercicio = async (id, exercicio) => {
    try {
        const { nome } = exercicio;
        const updateQuery = 'UPDATE exercicios SET nome = ? WHERE exercicioID = ?';
        const [updatedExercicio] = await connection.execute(updateQuery, [nome, id]);

        if (updatedExercicio.affectedRows === 0) {
            return { error: 'Exercicio not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update exercicio: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getExercicioId,
    createNewExercicio,
    deleteExercicio,
    updateExercicio,
};