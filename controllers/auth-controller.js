const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError('Email already exists');

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const user = await User.create({
    name,
    email,
    password,
    role: isFirstAccount ? 'admin' : 'user',
  });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  return res.status(StatusCodes.CREATED).send({ user: tokenUser });
};

const login = async (req, res) => {
  return res.send('login user');
};

const logout = async (req, res) => {
  return res.send('logout user');
};

module.exports = {
  register,
  login,
  logout,
};
