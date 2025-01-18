class Transport {
    server;
}
var ClientState;
(function (ClientState) {
    ClientState[ClientState["JOINING"] = 0] = "JOINING";
    ClientState[ClientState["JOINED"] = 1] = "JOINED";
    ClientState[ClientState["RECONNECTED"] = 2] = "RECONNECTED";
    ClientState[ClientState["LEAVING"] = 3] = "LEAVING";
})(ClientState || (ClientState = {}));

export { ClientState, Transport };
//# sourceMappingURL=Transport.mjs.map
