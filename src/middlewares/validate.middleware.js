const Validator = require("validatorjs");
const { UnprocessableEntity } = require("../utils/errors.util");

const validate = (rules) => (req, res, next) => {
  let validation = new Validator(req.body, rules);

  if (validation.fails()) {
    const errors = validation.errors.all();
    throw new UnprocessableEntity("Validation error.", errors);
  }

  next();
};

module.exports = validate;
