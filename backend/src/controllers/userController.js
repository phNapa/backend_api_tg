const connection = require('../models/connection');
const { connect } = require('../models/connection');
const userModel = require('../models/userModel');

const getAll = async (req, res) => {

    const users = await userModel.getAll();

    return res.status(200).json(users);
};

const getUserId = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.getUserId(id);
    return res.status(200).json(user[0]);
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
};