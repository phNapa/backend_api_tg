const connection = require('../services/connection');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const getAll = async () => {
    try {
        const query = 'SELECT * FROM usuario';
        const [users] = await connection.execute(query);
        return users;
    } catch (error) {
        return { error: `Failed to retrieve user: ${error.message}`};
    }
};


const getUserId = async (id) => {
    try {
        const query = 'SELECT * FROM usuario WHERE userID = ?';
        const [user] = await connection.execute(query, [id]);

        if (user.length === 0) {
            return { error: "user not found" };
        }

        return user;
    } catch (error) {
        return { error: `Failed to retrieve user: ${error.message}`};
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

const createUserCredentials = async (user) => {
    try {
        const { email, senha} = user;

        const checkIfExistsQuery = 'SELECT * FROM user_credentials WHERE email = ?';
        const [existingUser] = await connection.execute(checkIfExistsQuery, [email]);

        if (existingUser.length > 0) {
            return { error: "User already exists" };
        }

        const insertUserCredentialsQuery = 'INSERT INTO user_credentials (email, senha) VALUES (?, ?)';
        const hashedPassword = await bcrypt.hash(senha, 10);
        const [createdUserCredentials] = await connection.execute(insertUserCredentialsQuery, [email, hashedPassword]);

        return {
            insertIdCredentials: createdUserCredentials.insertId
        };
    } catch (error) {
        return { error: `Failed to create usuario: ${error.message}` };
    }
};

const createNewUser = async (user) => {
    try {
        const {cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, userCredentialsID} = user;

        const insertUserQuery = `
            INSERT INTO usuario (CPF, dataNasc, genero, name, contato, endereco, cidade, isProfessor,  userCredentialsID)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [createdUser] = await connection.execute(insertUserQuery, [cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, userCredentialsID]);

        return {
            insertId: createdUser.insertId
        };
    } catch (error) {
        return { error: `Failed to create usuario: ${error.message}` };
    }
};


const deleteUser = async (id) => {
    try {
        const deleteQuery = 'DELETE FROM usuario WHERE userID = ?';
        const [removedUser] = await connection.execute(deleteQuery, [id]);

        if (removedUser.affectedRows === 0) {
            return { error: 'User not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to delete user: ${error.message}` };
    }
};


const updateUser = async (id, user) => {
    try {
        const { cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor } = user;

        const updateQuery = `
            UPDATE usuario
            SET CPF = ?, dataNasc = ?, genero = ?, name = ?, contato = ?, endereco = ?, cidade = ?, isProfessor = ?
            WHERE userID = ?
        `;

        const [updatedUser] = await connection.execute(updateQuery, [cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, id]);

        if (updatedUser.affectedRows === 0) {
            return { error: 'User not found' };
        }

        return { success: true };
    } catch (error) {
        return { error: `Failed to update user: ${error.message}` };
    }
};


module.exports = {
    getAll,
    getUserId,
    createNewUser,
    deleteUser,
    updateUser,
    authenticate,
    createUserCredentials,
};