class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) return 400;
    if (this instanceof Unauthorized) return 401;
    if (this instanceof NotFound) return 404;
    if (this instanceof UnprocessableEntity) return 422;
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {
  constructor(message = "Authorization failed.") {
    super(message);
  }
}
class UnprocessableEntity extends GeneralError {
  constructor(message, errors = {}) {
    super(message);
    this.errors = errors;
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnprocessableEntity,
  Unauthorized,
};
