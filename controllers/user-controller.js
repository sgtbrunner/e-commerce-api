const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${id}`);
  }
  return res.status(StatusCodes.OK).json({ user });
};

const getUser = (req, res) => {
  return res.send('show current user');
};

const updateUser = (req, res) => {
  return res.send('update user');
};

const updateUserPassword = (req, res) => {
  return res.send('update user password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getUser,
  updateUser,
  updateUserPassword,
};
