const authService = require("../services/auth.service");
const { Unauthorized } = require("../utils/errors.util");
const auth = (req, res, next) => {
  const token = req.header("X-Auth-Token");

  if (!token) throw new Unauthorized();
  try {
    const user = authService.verifyToken(token);
    req.locals.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Token is invalid."));
  }
};

module.exports = auth;
