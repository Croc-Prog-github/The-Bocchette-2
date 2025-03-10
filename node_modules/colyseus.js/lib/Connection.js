"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const H3Transport_1 = require("./transport/H3Transport");
const WebSocketTransport_1 = require("./transport/WebSocketTransport");
class Connection {
    constructor(protocol) {
        this.events = {};
        switch (protocol) {
            case "h3":
                this.transport = new H3Transport_1.H3TransportTransport(this.events);
                break;
            default:
                this.transport = new WebSocketTransport_1.WebSocketTransport(this.events);
                break;
        }
    }
    connect(url, options) {
        this.transport.connect.call(this.transport, url, options);
    }
    send(data) {
        this.transport.send(data);
    }
    sendUnreliable(data) {
        this.transport.sendUnreliable(data);
    }
    close(code, reason) {
        this.transport.close(code, reason);
    }
    get isOpen() {
        return this.transport.isOpen;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map