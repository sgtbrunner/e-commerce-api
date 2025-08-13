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
  return res.status(StatusCodes.OK).json(req.user);
};

const updateUser = (req, res) => {
  return res.send('update user');
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      'Please provide both oldPassword and newPassword values'
    );
  }

  const user = await User.findById(req.user.userId);

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  return res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated!' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getUser,
  updateUser,
  updateUserPassword,
};
