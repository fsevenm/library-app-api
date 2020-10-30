const github = require("../../config/github");

const userRepository = require("./user.repository");

module.exports = (() => ({
  user: userRepository(github),
}))();
