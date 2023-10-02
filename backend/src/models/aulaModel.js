const connection = require('../services/connection');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM aula';
        const [aulas] = await connection.execute(query);
        return aulas;
    } catch (error) {
        throw new Error(`Failed to retrieve aulas: ${error.message}`);
    }
};


const getAulaId = async (id) => {
    try{
        const aula = await connection.execute('SELECT * FROM aula WHERE aulaID = ?',[id]);
        return aula;
    } catch (error) {
        return { error: `Failed to retrieve exercicio: ${error.message}` };
    }
};

const getAulaUser = async (id) => {
    try {
        const query = 'SELECT * FROM aula WHERE alunoID = ? ORDER BY aulaID DESC';
        const [aulas] = await connection.execute(query, [id]);
        return {
            data: aulas
        };
    } catch (error) {
        return { error: `Failed to retrieve aula: ${error.message}` };
    }
};


const createNewAula = async (aula) => {
    try {
        const { dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo } = aula;

        const insertQuery = `
            INSERT INTO aula (dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [createdAula] = await connection.execute(
            insertQuery,
            [dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo]
        );

        return { insertId: createdAula.insertId };
    } catch (error) {
        throw new Error(`Failed to create aula: ${error.message}`);
    }
};


const deleteAula = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM aula WHERE aulaID = ?';
        const [removedAula] = await connection.execute(deleteQuery, [id]);

        if (removedAula.affectedRows === 0) {
            return { error: 'Aula not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete aula: ${error.message}` };
    }
};


const updateAula = async (id, aula) => {
    try {
        const { dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo } = aula;

        const updateQuery = `
            UPDATE aula
            SET dataAula = ?, dificuldades = ?, duracao = ?, horario = ?, localo = ?, pesoAtual = ?, titulo = ?
            WHERE aulaID = ?
        `;

        const [updatedAula] = await connection.execute(
            updateQuery,
            [dataAula, dificuldades, duracao, horario, localo, pesoAtual, titulo, id]
        );

        if (updatedAula.affectedRows === 0) {
            return { error: 'Aula not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update aula: ${error.message}` };
    }
};

const finalizarAula = async (id, aula) => {
    try {
        const { dificuldades, duracao, finalizado, notaAula, notaProf, pesoAtual } = aula;

        const updateQuery = `
            UPDATE aula
            SET dificuldades = ?, duracao = ?, finalizado = ?, notaAula = ?, notaProf = ?, pesoAtual = ?
            WHERE aulaID = ?
        `;

        const [finalizadaAula] = await connection.execute(
            updateQuery,
            [dificuldades, duracao, finalizado, notaAula, notaProf, pesoAtual, id]
        );

        if (finalizadaAula.affectedRows === 0) {
            return { error: 'Aula not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update aula: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getAulaId,
    createNewAula,
    deleteAula,
    updateAula,
    getAulaUser,
    finalizarAula,
};