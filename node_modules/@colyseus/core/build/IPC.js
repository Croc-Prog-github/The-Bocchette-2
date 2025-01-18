'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Debug = require('./Debug.js');
var Protocol = require('./Protocol.js');
var Utils = require('./Utils.js');

async function requestFromIPC(presence, publishToChannel, method, args, rejectionTimeout = Utils.REMOTE_ROOM_SHORT_TIMEOUT) {
    return new Promise((resolve, reject) => {
        let unsubscribeTimeout;
        const requestId = Utils.generateId();
        const channel = `ipc:${requestId}`;
        const unsubscribe = () => {
            presence.unsubscribe(channel);
            clearTimeout(unsubscribeTimeout);
        };
        presence.subscribe(channel, (message) => {
            const [code, data] = message;
            if (code === Protocol.IpcProtocol.SUCCESS) {
                resolve(data);
            }
            else if (code === Protocol.IpcProtocol.ERROR) {
                reject(data);
            }
            unsubscribe();
        });
        presence.publish(publishToChannel, [method, requestId, args]);
        unsubscribeTimeout = setTimeout(() => {
            unsubscribe();
            reject(`IPC timed out. method: ${method}, args: ${JSON.stringify(args)}`);
        }, rejectionTimeout);
    });
}
async function subscribeIPC(presence, processId, channel, replyCallback) {
    await presence.subscribe(channel, (message) => {
        const [method, requestId, args] = message;
        const reply = (code, data) => {
            presence.publish(`ipc:${requestId}`, [code, data]);
        };
        // reply with method result
        let response;
        try {
            response = replyCallback(method, args);
        }
        catch (e) {
            Debug.debugAndPrintError(e);
            return reply(Protocol.IpcProtocol.ERROR, e.message || e);
        }
        if (!(response instanceof Promise)) {
            return reply(Protocol.IpcProtocol.SUCCESS, response);
        }
        response.
            then((result) => reply(Protocol.IpcProtocol.SUCCESS, result)).
            catch((e) => {
            // user might have called `reject()` without arguments.
            const err = e && e.message || e;
            reply(Protocol.IpcProtocol.ERROR, err);
        });
    });
}

exports.requestFromIPC = requestFromIPC;
exports.subscribeIPC = subscribeIPC;
//# sourceMappingURL=IPC.js.map
