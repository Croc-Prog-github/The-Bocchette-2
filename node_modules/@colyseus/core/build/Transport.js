'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Transport {
    server;
}
exports.ClientState = void 0;
(function (ClientState) {
    ClientState[ClientState["JOINING"] = 0] = "JOINING";
    ClientState[ClientState["JOINED"] = 1] = "JOINED";
    ClientState[ClientState["RECONNECTED"] = 2] = "RECONNECTED";
    ClientState[ClientState["LEAVING"] = 3] = "LEAVING";
})(exports.ClientState || (exports.ClientState = {}));

exports.Transport = Transport;
//# sourceMappingURL=Transport.js.map
