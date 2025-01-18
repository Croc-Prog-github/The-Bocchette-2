import { ErrorCode } from '../Protocol.mjs';

class ServerError extends Error {
    code;
    constructor(code = ErrorCode.MATCHMAKE_UNHANDLED, message) {
        super(message);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }
        this.name = 'ServerError';
        this.code = code;
    }
}

export { ServerError };
//# sourceMappingURL=ServerError.mjs.map
