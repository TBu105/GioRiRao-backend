const HttpStatusCodes = {
  FORBIDDEN: {
    code: 403,
    reason: "You don't have access to this",
  },
  CONFLICT: {
    code: 409,
    reason: "Conflict with current state of the resource",
  },
  NOT_FOUND: {
    code: 404,
    reason: "The requested resource was not found",
  },
  UNAUTHORIZED: {
    code: 401,
    reason:
      "Authentication is required and has failed or has not yet been provided",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    reason:
      "The server encountered an unexpected condition that prevented it from fulfilling the request",
  },
  BAD_REQUEST: {
    code: 400,
    reason: "The server cannot process the request due to a client error",
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    reason:
      "The method specified in the request is not allowed for the resource",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    reason: "The server does not support the media type that was requested",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    reason: "The user has sent too many requests in a given amount of time",
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    reason:
      "The server did not receive a timely response from the upstream server",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    reason:
      "The server is currently unable to handle the request due to a temporary overload or maintenance of the server",
  },
  NOT_IMPLEMENTED: {
    code: 501,
    reason:
      "The server does not support the functionality required to fulfill the request",
  },
  LENGTH_REQUIRED: {
    code: 411,
    reason:
      "The request did not specify the length of its content, which is required by the server",
  },
  PAYLOAD_TOO_LARGE: {
    code: 413,
    reason:
      "The server refuses to process the request because the request payload is larger than the server is willing or able to process",
  },
  PRECONDITION_FAILED: {
    code: 412,
    reason:
      "One or more conditions set in the request header fields evaluated to false when tested on the server",
  },
  REQUEST_TIMEOUT: {
    code: 408,
    reason:
      "The server did not receive a complete request message within the time that it was prepared to wait",
  },
  OK: {
    code: 200,
    reason: "OK!"
  },
  CREATED: {
    code: 201,
    reason: 'Created!'
  }
};

// Example usage:
// console.log(HttpStatusCodes.FORBIDDEN.code);  Outputs: 403
// console.log(HttpStatusCodes.FORBIDDEN.reason); Outputs: "You don't have access to this"

module.exports = HttpStatusCodes;
