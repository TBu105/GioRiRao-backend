const HttpStatusCodes = require("../config/http.status.config");

class ErrorResponse extends Error {
  constructor(message, status) {
    /**Kết luận về super(message)
     * Khi lớp con thừa hưởng từ lớp cha
     * lớp con không thể sử phương thức hay propertities của lớp cha nếu không sử dụng hàm super() trong
     * constructor của lớp con
     * Đó là lý do vì sao chúng ta phải sử dụng super()
     */
    super(message);
    this.status = status;
  }
}

class Forbidden extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.FORBIDDEN.reason,
    status = HttpStatusCodes.FORBIDDEN.code
  ) {
    super(message, status);
  }
}

class Conflict extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.CONFLICT.reason,
    status = HttpStatusCodes.CONFLICT.code
  ) {
    super(message, status);
  }
}

class NotFound extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.NOT_FOUND.reason,
    status = HttpStatusCodes.NOT_FOUND.code
  ) {
    super(message, status);
  }
}

class Unauthorized extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.UNAUTHORIZED.reason,
    status = HttpStatusCodes.UNAUTHORIZED.code
  ) {
    super(message, status);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.INTERNAL_SERVER_ERROR.reason,
    status = HttpStatusCodes.INTERNAL_SERVER_ERROR.code
  ) {
    super(message, status);
  }
}

class BadRequest extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.BAD_REQUEST.reason,
    status = HttpStatusCodes.BAD_REQUEST.code
  ) {
    super(message, status);
  }
}

class MethodNotAllowed extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.METHOD_NOT_ALLOWED.reason,
    status = HttpStatusCodes.METHOD_NOT_ALLOWED.code
  ) {
    super(message, status);
  }
}

class UnsupportedMediaType extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE.reason,
    status = HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE.code
  ) {
    super(message, status);
  }
}

class TooManyRequests extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.TOO_MANY_REQUESTS.reason,
    status = HttpStatusCodes.TOO_MANY_REQUESTS.code
  ) {
    super(message, status);
  }
}

class GatewayTimeout extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.GATEWAY_TIMEOUT.reason,
    status = HttpStatusCodes.GATEWAY_TIMEOUT.code
  ) {
    super(message, status);
  }
}

class ServiceUnavailable extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.SERVICE_UNAVAILABLE.reason,
    status = HttpStatusCodes.SERVICE_UNAVAILABLE.code
  ) {
    super(message, status);
  }
}

class NotImplemented extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.NOT_IMPLEMENTED.reason,
    status = HttpStatusCodes.NOT_IMPLEMENTED.code
  ) {
    super(message, status);
  }
}

class LengthRequired extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.LENGTH_REQUIRED.reason,
    status = HttpStatusCodes.LENGTH_REQUIRED.code
  ) {
    super(message, status);
  }
}

class PayloadTooLarge extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.PAYLOAD_TOO_LARGE.reason,
    status = HttpStatusCodes.PAYLOAD_TOO_LARGE.code
  ) {
    super(message, status);
  }
}

class PreconditionFailed extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.PRECONDITION_FAILED.reason,
    status = HttpStatusCodes.PRECONDITION_FAILED.code
  ) {
    super(message, status);
  }
}

class RequestTimeout extends ErrorResponse {
  constructor(
    message = HttpStatusCodes.REQUEST_TIMEOUT.reason,
    status = HttpStatusCodes.REQUEST_TIMEOUT.code
  ) {
    super(message, status);
  }
}

module.exports = {
  Forbidden,
  Conflict,
  NotFound,
  Unauthorized,
  InternalServerError,
  BadRequest,
  MethodNotAllowed,
  UnsupportedMediaType,
  TooManyRequests,
  GatewayTimeout,
  ServiceUnavailable,
  NotImplemented,
  LengthRequired,
  PayloadTooLarge,
  PreconditionFailed,
  RequestTimeout,
};
