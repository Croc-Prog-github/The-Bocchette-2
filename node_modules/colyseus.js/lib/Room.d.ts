import { Connection } from './Connection';
import { Serializer } from './serializer/Serializer';
import { SchemaConstructor } from './serializer/SchemaSerializer';
import { Packr } from '@colyseus/msgpackr';
export interface RoomAvailable<Metadata = any> {
    name: string;
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}
export declare class Room<State = any> {
    roomId: string;
    sessionId: string;
    reconnectionToken: string;
    name: string;
    connection: Connection;
    onStateChange: {
        once: (cb: (state: State) => void) => void;
        remove: (cb: (state: State) => void) => void;
        invoke: (state: State) => void;
        invokeAsync: (state: State) => Promise<any[]>;
        clear: () => void;
    } & ((this: any, cb: (state: State) => void) => import("./core/signal").EventEmitter<(state: State) => void>);
    onError: {
        once: (cb: (code: number, message?: string) => void) => void;
        remove: (cb: (code: number, message?: string) => void) => void;
        invoke: (code: number, message?: string) => void;
        invokeAsync: (code: number, message?: string) => Promise<any[]>;
        clear: () => void;
    } & ((this: any, cb: (code: number, message?: string) => void) => import("./core/signal").EventEmitter<(code: number, message?: string) => void>);
    onLeave: {
        once: (cb: (code: number, reason?: string) => void) => void;
        remove: (cb: (code: number, reason?: string) => void) => void;
        invoke: (code: number, reason?: string) => void;
        invokeAsync: (code: number, reason?: string) => Promise<any[]>;
        clear: () => void;
    } & ((this: any, cb: (code: number, reason?: string) => void) => import("./core/signal").EventEmitter<(code: number, reason?: string) => void>);
    protected onJoin: {
        once: (cb: (...args: any[]) => void | Promise<any>) => void;
        remove: (cb: (...args: any[]) => void | Promise<any>) => void;
        invoke: (...args: any[]) => void;
        invokeAsync: (...args: any[]) => Promise<any[]>;
        clear: () => void;
    } & ((this: any, cb: (...args: any[]) => void | Promise<any>) => import("./core/signal").EventEmitter<(...args: any[]) => void | Promise<any>>);
    serializerId: string;
    serializer: Serializer<State>;
    protected hasJoined: boolean;
    protected rootSchema: SchemaConstructor<State>;
    protected onMessageHandlers: {
        emit(event: string, ...args: any[]): void;
        events: {};
        on(event: string, cb: (...args: any[]) => void): () => void;
    };
    protected packr: Packr;
    constructor(name: string, rootSchema?: SchemaConstructor<State>);
    connect(endpoint: string, devModeCloseCallback?: () => void, room?: Room, // when reconnecting on devMode, re-use previous room intance for handling events.
    options?: any, headers?: any): void;
    leave(consented?: boolean): Promise<number>;
    onMessage<T = any>(type: "*", callback: (type: string | number, message: T) => void): any;
    onMessage<T = any>(type: string | number, callback: (message: T) => void): any;
    send<T = any>(type: string | number, message?: T): void;
    sendUnreliable<T = any>(type: string | number, message?: T): void;
    sendBytes(type: string | number, bytes: Uint8Array): void;
    get state(): State;
    removeAllListeners(): void;
    protected onMessageCallback(event: MessageEvent): void;
    private dispatchMessage;
    private destroy;
    private getMessageHandlerKey;
}
