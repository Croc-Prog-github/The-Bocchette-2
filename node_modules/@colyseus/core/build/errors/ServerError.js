'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Protocol = require('../Protocol.js');

class ServerError extends Error {
    code;
    constructor(code = Protocol.ErrorCode.MATCHMAKE_UNHANDLED, message) {
        super(message);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }
        this.name = 'ServerError';
        this.code = code;
    }
}

exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map
