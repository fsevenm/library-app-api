const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const { BadRequest } = require("../utils/errors.util");
const { Response } = require("../utils/response.util");

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new BadRequest("Invalid credentials.");
    }
    const verified = await authService.verify(password, user.password);
    if (!verified) throw new BadRequest("Invalid credentials.");

    const token = await authService.issueToken({
      user: {
        id: user.id,
      },
    });
    return new Response(res, { token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};
