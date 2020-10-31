const env = process.env.NODE_ENV || "development";
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

  return res.status(500).json({
    success: false,
    status: 500,
    message:
      env === "production"
        ? "Internal server error."
        : err.message || "Internal server error.",
  });
};

module.exports = handleErrors;
