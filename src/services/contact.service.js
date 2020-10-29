const model = require("../models");

function find(id) {
  return model.Contact.findByPk(id);
}

function findAll(userId) {
  return model.Contact.findAll({ where: { userId } });
}

function create(payload) {
  return model.Contact.create(payload);
}

function update(payload, id) {
  return model.Contact.update(payload, {
    where: {
      id,
    },
  });
}

function destroy(id) {
  return model.Contact.destroy({ where: { id } });
}

module.exports = {
  find,
  findAll,
  create,
  update,
  destroy,
};
