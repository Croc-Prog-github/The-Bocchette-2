// packages/core/src/errors/ServerError.ts
import { ErrorCode } from "../Protocol.mjs";
var ServerError = class _ServerError extends Error {
  constructor(code = ErrorCode.MATCHMAKE_UNHANDLED, message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _ServerError);
    }
    this.name = "ServerError";
    this.code = code;
  }
};
export {
  ServerError
};
