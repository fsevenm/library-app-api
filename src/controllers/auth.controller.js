const userService = require("../services/user");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userToken = await userService.logIn(email, password);
    return res.json({ token: userToken });
  } catch (errorCode) {
    return res.status(errorCode);
  }
}

module.exports = {
  login,
};
