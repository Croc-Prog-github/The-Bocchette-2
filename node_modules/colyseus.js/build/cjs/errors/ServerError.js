// colyseus.js@0.16.17
'use strict';

exports.CloseCode = void 0;
(function (CloseCode) {
    CloseCode[CloseCode["CONSENTED"] = 4000] = "CONSENTED";
    CloseCode[CloseCode["DEVMODE_RESTART"] = 4010] = "DEVMODE_RESTART";
})(exports.CloseCode || (exports.CloseCode = {}));
class ServerError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "ServerError";
        this.code = code;
    }
}

exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map
