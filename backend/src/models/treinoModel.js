const connection = require('../services/connection');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM treino';
        const [treinos] = await connection.execute(query);
        return treinos;
    } catch (error) {
        return { error: `Failed to retrieve treino: ${error.message}` };
    }
};


const getTreinoId = async (id) => {
    try {
        const treino = await connection.execute('SELECT * FROM treino where treinoID = ?',[id]);
        return treino;
    } catch (error) {
        return { error: `Failed to retrieve treino: ${error.message}` };
    }
};

const createNewTreino = async (treino) => {
    try {
        const { cadencia, descanso, exercicios, repeticoes, series } = treino;

        const insertQuery = `
            INSERT INTO treino (cadencia, descanso, exercicios, repeticoes, series)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [createdTreino] = await connection.execute(insertQuery, [cadencia, descanso, exercicios, repeticoes, series]);

        return { insertId: createdTreino.insertId };
    } catch (error) {
        return { error: `Failed to create treino: ${error.message}` };
    }
};


const deleteTreino = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM treino WHERE treinoID = ?';
        const [removedTreino] = await connection.execute(deleteQuery, [id]);

        if (removedTreino.affectedRows === 0) {
            return { error: 'Treino not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete treino: ${error.message}` };
    }
};


const updateTreino = async (id, treino) => {
    try {
        const { cadencia, descanso, exercicios, repeticoes, series } = treino;

        const updateQuery = `
            UPDATE treino
            SET cadencia = ?, descanso = ?, exercicios = ?, repeticoes = ?, series = ?
            WHERE treinoID = ?
        `;

        const [updatedTreino] = await connection.execute(updateQuery, [cadencia, descanso, exercicios, repeticoes, series, id]);

        if (updatedTreino.affectedRows === 0) {
            return { error: 'Treino not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update treino: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getTreinoId,
    createNewTreino,
    deleteTreino,
    updateTreino,
};