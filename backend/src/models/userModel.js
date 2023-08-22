const connection = require('./connection');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM usuario');
    return users;
};

const getUserId = async (id) => {
    const user = await connection.execute('SELECT * FROM usuario WHERE userID = ?',[id]);
    return user;
};

const authenticate = async (userCredentials) => {
    const {email, senha} = userCredentials;

    
    const getUserCredentials = await connection.execute('SELECT * FROM user_credentials WHERE email = ?',[email])

    if (getUserCredentials[0][0] != ''){
        return userCredentials;
    }
    return userCredentials;

}

const createNewUser = async (user) => {
    const {email, senha, cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor} = user;

    const checkIfExists = await connection.execute('SELECT * FROM user_credentials WHERE email = ?',[email])

    if (checkIfExists[0] != ''){
        return {message: "user already exists"}
    }else{
        const query = 'INSERT INTO usuario (CPF, dataNasc, genero, name, contato, endereco, cidade, isProfessor, fotoPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
        const [createdUser] = await connection.execute(query,[cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, 'null']);

        const queryCredentials = 'INSERT INTO user_credentials (email, senha, userID) VALUES (?, ?, ?)';

        

        const [createdUserCredentials] = await connection.execute(queryCredentials,[email, bcrypt.hashSync(senha,10), createdUser.insertId]);

        return {insertId: createdUser.insertId, insertIdCredentials: createdUserCredentials.insertId};
    }
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
    authenticate,
};