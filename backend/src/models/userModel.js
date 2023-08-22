const connection = require('./connection');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM usuario';
        const [users] = await connection.execute(query);
        return users;
    } catch (error) {
        throw new Error(`Failed to retrieve users: ${error.message}`);
    }
};


const getUserId = async (id) => {
    try {
        const query = 'SELECT * FROM usuario WHERE userID = ?';
        const [user] = await connection.execute(query, [id]);

        if (user.length === 0) {
            throw new Error('User not found');
        }

        return user[0]; // Return the first user (assuming ID is unique)
    } catch (error) {
        throw new Error(`Failed to retrieve user: ${error.message}`);
    }
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
    try {
        const { email, senha, cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor } = user;

        const checkIfExistsQuery = 'SELECT * FROM user_credentials WHERE email = ?';
        const [existingUser] = await connection.execute(checkIfExistsQuery, [email]);

        if (existingUser.length > 0) {
            return { error: "User already exists" };
        }

        const insertUserQuery = `
            INSERT INTO usuario (CPF, dataNasc, genero, name, contato, endereco, cidade, isProfessor, fotoPerfil)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [createdUser] = await connection.execute(insertUserQuery, [cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, 'null']);

        const insertUserCredentialsQuery = 'INSERT INTO user_credentials (email, senha, userID) VALUES (?, ?, ?)';
        const hashedPassword = await bcrypt.hash(senha, 10);
        const [createdUserCredentials] = await connection.execute(insertUserCredentialsQuery, [email, hashedPassword, createdUser.insertId]);

        return {
            insertId: createdUser.insertId,
            insertIdCredentials: createdUserCredentials.insertId
        };
    } catch (error) {
        return { error: `Failed to create professor: ${error.message}` };
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