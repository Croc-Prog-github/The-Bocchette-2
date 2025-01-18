'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var http = require('http');
var querystring = require('querystring');
var url = require('url');
var WebSocket = require('ws');
var core = require('@colyseus/core');
var WebSocketClient = require('./WebSocketClient.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);

function noop() { }
function heartbeat() { this.pingCount = 0; }
class WebSocketTransport extends core.Transport {
    wss;
    pingInterval;
    pingIntervalMS;
    pingMaxRetries;
    constructor(options = {}) {
        super();
        // disable per-message deflate by default
        if (options.perMessageDeflate === undefined) {
            options.perMessageDeflate = false;
        }
        this.pingIntervalMS = (options.pingInterval !== undefined)
            ? options.pingInterval
            : 3000;
        this.pingMaxRetries = (options.pingMaxRetries !== undefined)
            ? options.pingMaxRetries
            : 2;
        // create server by default
        if (!options.server && !options.noServer) {
            options.server = http__default['default'].createServer();
        }
        this.wss = new WebSocket__default['default'].Server(options);
        this.wss.on('connection', this.onConnection);
        // this is required to allow the ECONNRESET error to trigger on the `server` instance.
        this.wss.on('error', (err) => core.debugAndPrintError(err));
        this.server = options.server;
        if (this.pingIntervalMS > 0 && this.pingMaxRetries > 0) {
            this.server.on('listening', () => this.autoTerminateUnresponsiveClients(this.pingIntervalMS, this.pingMaxRetries));
            this.server.on('close', () => clearInterval(this.pingInterval));
        }
    }
    listen(port, hostname, backlog, listeningListener) {
        this.server.listen(port, hostname, backlog, listeningListener);
        return this;
    }
    shutdown() {
        this.wss.close();
        this.server.close();
    }
    simulateLatency(milliseconds) {
        const previousSend = WebSocket__default['default'].prototype.send;
        WebSocket__default['default'].prototype.send = function (...args) {
            setTimeout(() => previousSend.apply(this, args), milliseconds);
        };
    }
    autoTerminateUnresponsiveClients(pingInterval, pingMaxRetries) {
        // interval to detect broken connections
        this.pingInterval = setInterval(() => {
            this.wss.clients.forEach((client) => {
                //
                // if client hasn't responded after the interval, terminate its connection.
                //
                if (client.pingCount >= pingMaxRetries) {
                    // debugConnection(`terminating unresponsive client ${client.sessionId}`);
                    core.debugConnection(`terminating unresponsive client`);
                    return client.terminate();
                }
                client.pingCount++;
                client.ping(noop);
            });
        }, pingInterval);
    }
    async onConnection(rawClient, req) {
        // prevent server crashes if a single client had unexpected error
        rawClient.on('error', (err) => core.debugAndPrintError(err.message + '\n' + err.stack));
        rawClient.on('pong', heartbeat);
        // compatibility with ws / uws
        const upgradeReq = req || rawClient.upgradeReq;
        const parsedURL = url__default['default'].parse(upgradeReq.url);
        const sessionId = querystring__default['default'].parse(parsedURL.query).sessionId;
        const processAndRoomId = parsedURL.pathname.match(/\/[a-zA-Z0-9_\-]+\/([a-zA-Z0-9_\-]+)$/);
        const roomId = processAndRoomId && processAndRoomId[1];
        const room = core.matchMaker.getRoomById(roomId);
        // set client id
        rawClient.pingCount = 0;
        const client = new WebSocketClient.WebSocketClient(sessionId, rawClient);
        //
        // TODO: DRY code below with all transports
        //
        try {
            if (!room || !room.hasReservedSeat(sessionId)) {
                throw new Error('seat reservation expired.');
            }
            await room._onJoin(client, upgradeReq);
        }
        catch (e) {
            core.debugAndPrintError(e);
            // send error code to client then terminate
            client.error(e.code, e.message, () => rawClient.close(core.Protocol.WS_CLOSE_WITH_ERROR));
        }
    }
}

exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
