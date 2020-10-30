const authService = require("../services/auth.service");
const { Unauthorized } = require("../utils/errors.util");
const auth = async (req, res, next) => {
  try {
    const token = req.header("X-Auth-Token");

    if (!token) throw new Unauthorized();

    const user = authService.verifyToken(token);
    req.app.locals.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Token is invalid."));
  }
};

module.exports = auth;
