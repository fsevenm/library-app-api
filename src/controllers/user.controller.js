const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const { BadRequest } = require("../utils/errors.util");
const { ResponseCreated } = require("../utils/response.util");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    let user = await userService.findByEmail(email);

    if (user) throw new BadRequest("User already registered.");

    const hashedPassword = await authService.hashPassword(password);

    user = await userService.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = authService.issueToken({
      user: {
        id: user.id,
      },
    });
    return new ResponseCreated(res, { token }, "Registration succeded.");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
};
