const getAllUsers = (req, res) => {
  return res.send('get all users');
};

const getSingleUser = (req, res) => {
  return res.send('get single user');
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
