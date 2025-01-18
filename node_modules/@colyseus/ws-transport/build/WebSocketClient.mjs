import WebSocket from 'ws';
import { ClientState, getMessageBytes, Protocol } from '@colyseus/core';
import { Schema } from '@colyseus/schema';

const SEND_OPTS = { binary: true };
class WebSocketClient {
    id;
    ref;
    sessionId;
    state = ClientState.JOINING;
    _enqueuedMessages = [];
    _afterNextPatchQueue;
    constructor(id, ref) {
        this.id = id;
        this.ref = ref;
        this.sessionId = id;
    }
    send(messageOrType, messageOrOptions, options) {
        this.enqueueRaw((messageOrType instanceof Schema)
            ? getMessageBytes[Protocol.ROOM_DATA_SCHEMA](messageOrType)
            : getMessageBytes[Protocol.ROOM_DATA](messageOrType, messageOrOptions), options);
    }
    enqueueRaw(data, options) {
        // use room's afterNextPatch queue
        if (options?.afterNextPatch) {
            this._afterNextPatchQueue.push([this, arguments]);
            return;
        }
        if (this.state === ClientState.JOINING) {
            // sending messages during `onJoin`.
            // - the client-side cannot register "onMessage" callbacks at this point.
            // - enqueue the messages to be send after JOIN_ROOM message has been sent
            this._enqueuedMessages.push(data);
            return;
        }
        this.raw(data, options);
    }
    raw(data, options, cb) {
        if (this.ref.readyState !== WebSocket.OPEN) {
            console.warn('trying to send data to inactive client', this.sessionId);
            return;
        }
        this.ref.send(data, SEND_OPTS, cb);
    }
    error(code, message = '', cb) {
        this.raw(getMessageBytes[Protocol.ERROR](code, message), undefined, cb);
    }
    get readyState() {
        return this.ref.readyState;
    }
    leave(code, data) {
        this.ref.close(code, data);
    }
    close(code, data) {
        console.warn('DEPRECATION WARNING: use client.leave() instead of client.close()');
        try {
            throw new Error();
        }
        catch (e) {
            console.log(e.stack);
        }
        this.leave(code, data);
    }
    toJSON() {
        return { sessionId: this.sessionId, readyState: this.readyState };
    }
}

export { WebSocketClient };
//# sourceMappingURL=WebSocketClient.mjs.map
