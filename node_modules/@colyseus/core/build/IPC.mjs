import { debugAndPrintError } from './Debug.mjs';
import { IpcProtocol } from './Protocol.mjs';
import { REMOTE_ROOM_SHORT_TIMEOUT, generateId } from './Utils.mjs';

async function requestFromIPC(presence, publishToChannel, method, args, rejectionTimeout = REMOTE_ROOM_SHORT_TIMEOUT) {
    return new Promise((resolve, reject) => {
        let unsubscribeTimeout;
        const requestId = generateId();
        const channel = `ipc:${requestId}`;
        const unsubscribe = () => {
            presence.unsubscribe(channel);
            clearTimeout(unsubscribeTimeout);
        };
        presence.subscribe(channel, (message) => {
            const [code, data] = message;
            if (code === IpcProtocol.SUCCESS) {
                resolve(data);
            }
            else if (code === IpcProtocol.ERROR) {
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
            debugAndPrintError(e);
            return reply(IpcProtocol.ERROR, e.message || e);
        }
        if (!(response instanceof Promise)) {
            return reply(IpcProtocol.SUCCESS, response);
        }
        response.
            then((result) => reply(IpcProtocol.SUCCESS, result)).
            catch((e) => {
            // user might have called `reject()` without arguments.
            const err = e && e.message || e;
            reply(IpcProtocol.ERROR, err);
        });
    });
}

export { requestFromIPC, subscribeIPC };
//# sourceMappingURL=IPC.mjs.map
