import type { Client } from '../Transport';
import type { ExtractAuthData, ExtractUserData, Room } from '../Room';
export type RoomException<R extends Room = Room> = OnCreateException<R> | OnAuthException<R> | OnJoinException<R> | OnLeaveException<R> | OnDisposeException | OnMessageException<R> | SimulationIntervalException | TimedEventException;
export declare class OnCreateException<R extends Room = Room> extends Error {
    options: Parameters<R['onCreate']>[0];
    constructor(cause: Error, message: string, options: Parameters<R['onCreate']>[0]);
}
export declare class OnAuthException<R extends Room = Room> extends Error {
    client: Parameters<R['onAuth']>[0];
    options: Parameters<R['onAuth']>[1];
    constructor(cause: Error, message: string, client: Parameters<R['onAuth']>[0], options: Parameters<R['onAuth']>[1]);
}
export declare class OnJoinException<R extends Room = Room> extends Error {
    client: Parameters<R['onJoin']>[0];
    options: Parameters<R['onJoin']>[1];
    auth: Parameters<R['onJoin']>[2];
    constructor(cause: Error, message: string, client: Parameters<R['onJoin']>[0], options: Parameters<R['onJoin']>[1], auth: Parameters<R['onJoin']>[2]);
}
export declare class OnLeaveException<R extends Room = Room> extends Error {
    client: Parameters<R['onLeave']>[0];
    consented: Parameters<R['onLeave']>[1];
    constructor(cause: Error, message: string, client: Parameters<R['onLeave']>[0], consented: Parameters<R['onLeave']>[1]);
}
export declare class OnDisposeException extends Error {
    constructor(cause: Error, message: string);
}
export declare class OnMessageException<R extends Room = Room, MessagePayload = any> extends Error {
    client: Client<ExtractUserData<R['clients']>, ExtractAuthData<R['clients']>>;
    payload: MessagePayload;
    type: string;
    constructor(cause: Error, message: string, client: Client<ExtractUserData<R['clients']>, ExtractAuthData<R['clients']>>, payload: MessagePayload, type: string);
}
export declare class SimulationIntervalException extends Error {
    constructor(cause: Error, message: string);
}
export declare class TimedEventException extends Error {
    args: any[];
    constructor(cause: Error, message: string, ...args: any[]);
}
