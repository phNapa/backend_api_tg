const connection = require('./connection');

const getAll = async () => {
    const [treino] = await connection.execute('SELECT* FROM treino');
    return treino;
};

const getTreinoId = async (id) => {
    const treino = await connection.execute('SELECT * FROM treino where treinoID = ?',[id]);
    return treino;
};

const createNewTreino = async (treino) => {
    const {cadencia, descanso, exercicios, repeticoes, series} = treino;

    const query = 'INSERT INTO Treino (cadencia, descanso, exercicios, repeticoes, series) VALUES (?, ?, ?, ?, ?)';

    const [createdTreino] = await connection.execute(query,[cadencia, descanso, exercicios, repeticoes, series]);

    return {insertId: createdTreino.insertId};
    
};

const deleteTreino = async (id) => {
    const removedTreino = await connection.execute('DELETE FROM treino WHERE treinoID = ?',[id]);

    return removedTreino;
}

const updateTreino = async (id, treino) => {
    const {cadencia, descanso, exercicios, repeticoes, series} = treino;
    
    const query = 'UPDATE Treino SET cadencia = ?, descanso = ?, exercicios = ?, repeticoes = ?, series = ? WHERE treinoID = ?';

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