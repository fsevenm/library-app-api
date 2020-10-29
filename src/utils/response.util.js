class Response {
  constructor(res, data, message = "") {
    this.data = data;
    this.message = message;

    return res.status(this.getCode()).json({
      success: true,
      status: this.getCode(),
      message: this.message,
      data: this.data,
    });
  }

  getCode() {
    if (this instanceof ResponseOk) return 200;
    if (this instanceof ResponseCreated) return 201;
    if (this instanceof ResponseNoContent) return 204;
    return 200;
  }
}

class ResponseOk extends Response {}
class ResponseCreated extends Response {}
class ResponseNoContent extends Response {}

module.exports = {
  Response,
  ResponseOk,
  ResponseCreated,
  ResponseNoContent,
};
