const connection = require('./connection');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM treino';
        const [treinos] = await connection.execute(query);
        return treinos;
    } catch (error) {
        throw new Error(`Failed to retrieve treinos: ${error.message}`);
    }
};


const getTreinoId = async (id) => {
    try {
        const treino = await connection.execute('SELECT * FROM treino where treinoID = ?',[id]);
        return treino;
    } catch (error) {
        throw new Error(`Failed to retrieve treino: ${error.message}`);
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
        return { error: `Failed to create professor: ${error.message}` };
    }
};


const deleteTreino = async (id) => {
    const removedTreino = await connection.execute('DELETE FROM treino WHERE treinoID = ?',[id]);

    return removedTreino;
}

const updateTreino = async (id, treino) => {
    const {cadencia, descanso, exercicios, repeticoes, series} = treino;
    
    const query = 'UPDATE treino SET cadencia = ?, descanso = ?, exercicios = ?, repeticoes = ?, series = ? WHERE treinoID = ?';

    const updatedTreino = await connection.execute(query,[cadencia, descanso, exercicios, repeticoes, series, id]);

    return updatedTreino;
}

module.exports = {
    getAll,
    getTreinoId,
    createNewTreino,
    deleteTreino,
    updateTreino,
};