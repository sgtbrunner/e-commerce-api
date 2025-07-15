const register = async (req, res) => {
  return res.send('register user');
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
