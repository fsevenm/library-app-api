require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function issueToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function verify(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user;
}

module.exports = {
  issueToken,
  verify,
  hashPassword,
  verifyToken,
};
