const { GeneralError, UnprocessableEntity } = require("../utils/errors.util");

const handleErrors = (err, req, res, next) => {
  if (err instanceof UnprocessableEntity) {
    return res.status(err.getCode()).json({
      success: false,
      status: err.getCode(),
      message: err.message,
      errors: err.errors,
    });
  }
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      success: false,
      status: err.getCode(),
      message: err.message,
    });
  }
  // Todo: prevent error messages sent to user at production
  return res.status(500).json({
    success: false,
    status: 500,
    message: err.message || "Internal server error.",
  });
};

module.exports = handleErrors;
