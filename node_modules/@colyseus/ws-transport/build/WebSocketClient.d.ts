import WebSocket from 'ws';
import { Client, ClientPrivate, ClientState, ISendOptions } from '@colyseus/core';
export declare class WebSocketClient implements Client, ClientPrivate {
    id: string;
    ref: WebSocket;
    sessionId: string;
    state: ClientState;
    reconnectionToken: string;
    _enqueuedMessages: any[];
    _afterNextPatchQueue: any;
    _reconnectionToken: string;
    _joinedAt: any;
    constructor(id: string, ref: WebSocket);
    sendBytes(type: string | number, bytes: Buffer | Uint8Array, options?: ISendOptions): void;
    send(messageOrType: any, messageOrOptions?: any | ISendOptions, options?: ISendOptions): void;
    enqueueRaw(data: Uint8Array | Buffer, options?: ISendOptions): void;
    raw(data: Uint8Array | Buffer, options?: ISendOptions, cb?: (err?: Error) => void): void;
    error(code: number, message?: string, cb?: (err?: Error) => void): void;
    get readyState(): 0 | 1 | 2 | 3;
    leave(code?: number, data?: string): void;
    close(code?: number, data?: string): void;
    toJSON(): {
        sessionId: string;
        readyState: 0 | 1 | 2 | 3;
    };
}
