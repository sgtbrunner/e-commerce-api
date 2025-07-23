const jwt = require('jsonwebtoken');
const { ONE_DAY, LOGIN_COOKIE_NAME } = require('.');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user, duration = ONE_DAY }) => {
  const token = createJWT({ payload: user });

  res.cookie(LOGIN_COOKIE_NAME, token, {
    httpOnly: true,
    expires: new Date(Date.now() + duration),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
