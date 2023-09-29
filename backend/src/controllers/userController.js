const connection = require('../services/connection');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve users' });
    }
};


const getUserId = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.getUserId(id);
    return res.status(200).json(user[0]);
};

const authenticate = async (req, res) => {
    const authenticateParams = await userModel.authenticate(req.body);

    const user = await connection.execute('SELECT * FROM user_credentials WHERE email = ?',[authenticateParams['email']])

    if (user[0][0] == null){
        return res.status(401).json({ error: "Email incorreto" });
    }
    const validPassword = bcrypt.compareSync(authenticateParams['senha'], user[0][0]['senha']);

    if (validPassword == false) {
        return res.status(401).json({ error: "Senha incorreta!" });
    }

    const token = jsonwebtoken.sign(
        {
          userID: user[0][0]['userID'],
          email: authenticateParams['email']
        },
        process.env.ACCESS_TOKEN_SECRET.toString(),
        {
          expiresIn: "8h",
        }
    );
    
    const horarioAtual = new Date();

    const expiracaoToken = new Date(horarioAtual.getTime() + 8 * 60 * 60 * 1000);

    const userID = user[0][0]['id']

    const checkProfessor = await connection.execute('SELECT isProfessor FROM usuario WHERE userCredentialsID = ?',[userID]);
    const isProfessor = checkProfessor[0][0]['isProfessor'];

    if (isProfessor == 1){
        const getProfessorId = await connection.execute('SELECT professorID FROM professor WHERE userID = ?',[userID]);
        const professorID = getProfessorId[0][0]['professorID'];
        return res.status(200).json({token, userID, isProfessor, professorID, expiracaoToken});
    } else {
        const getAlunoId = await connection.execute('SELECT alunoID FROM aluno WHERE userID = ?',[userID]);
        const alunoID = getAlunoId[0][0]['alunoID'];
        return res.status(200).json({token, userID, isProfessor, alunoID, expiracaoToken});
    }
}

const createUserCredentials = async (req, res) => {
    const createdUserCredentials = await userModel.createUserCredentials(req.body);

    return res.status(201).json(createdUserCredentials);
};

const createNewUser = async (req, res) => {
    const createdUser = await userModel.createNewUser(req.body);

    return res.status(201).json(createdUser);
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    await userModel.deleteUser(id);
    return res.status(204).json();
};

const updateUser = async (req, res) => {
    const {id} = req.params;

    await userModel.updateUser(id,req.body);
    return res.status(204).json();
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