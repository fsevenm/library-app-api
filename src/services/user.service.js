const model = require("../models");

function findAll() {
  return model.User.findAll();
}

function create(payload) {
  return model.User.create(payload);
}

function findByEmail(email) {
  return model.User.findOne({
    where: { email },
  });
}

module.exports = {
  findAll,
  findByEmail,
  create,
};
