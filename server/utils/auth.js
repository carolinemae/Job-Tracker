const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.employee = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, firstName, lastName, _id, admin }) {
    const payload = { email, firstName, lastName, _id, admin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
