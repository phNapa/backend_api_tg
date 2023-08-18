const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM usuario');
    return users;
};

const getUserId = async (id) => {
    const user = await connection.execute('SELECT * FROM usuario WHERE userID = ?',[id]);
    return user;
};

const createNewUser = async (user) => {
    const {email, senha, cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor} = user;

    const query = 'INSERT INTO usuario (CPF, dataNasc, genero, name, contato, endereco, cidade, isProfessor, fotoPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
    const [createdUser] = await connection.execute(query,[cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, 'null']);

    const queryCredentials = 'INSERT INTO user_credentials (email, senha, userID) VALUES (?, ?, ?)';
    const [createdUserCredentials] = await connection.execute(queryCredentials,[email, senha, createdUser.insertId]);

    return {insertId: createdUser.insertId, insertIdCredentials: createdUserCredentials.insertId};
};

const deleteUser = async (id) => {
    const removedUser = await connection.execute('DELETE FROM usuario WHERE userID = ?',[id]);

    return removedUser;
}

const updateUser = async (id, user) => {
    const {cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor} = user;
    
    const query = 'UPDATE usuario SET CPF = ?, dataNasc = ?, genero = ?, name = ?, contato = ?, endereco = ?, cidade = ?, isProfessor = ? WHERE userID = ?';

    const updatedUser = await connection.execute(query,[cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, id]);

    return updatedUser;
}

module.exports = {
    getAll,
    getUserId,
    createNewUser,
    deleteUser,
    updateUser,
};