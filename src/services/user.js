const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function findAll() {
  return User.findAndCountAll();
}

function create(payload) {
  return User.create(payload);
}

function logIn(email, password) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      reject(400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) reject(400);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error(err.message);
        reject(500);
      }
      resolve(token);
    });
  });
}

module.exports = {
  findAll,
  create,
  logIn,
};
