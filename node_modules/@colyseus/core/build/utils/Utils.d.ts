import { EventEmitter } from "events";
import { RoomException } from '../errors/RoomExceptions.js';
import { Type } from './types.js';
export declare const REMOTE_ROOM_SHORT_TIMEOUT: number;
export declare const MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME: number;
export declare function generateId(length?: number): string;
export declare function getBearerToken(authHeader: string): string;
export declare function registerGracefulShutdown(callback: (err?: Error) => void): void;
export declare function retry<T = any>(cb: Function, maxRetries?: number, errorWhiteList?: any[], retries?: number): Promise<T>;
export declare function spliceOne(arr: any[], index: number): boolean;
export declare class Deferred<T = any> {
    promise: Promise<T>;
    resolve: Function;
    reject: Function;
    constructor(promise?: Promise<T>);
    then(func: (value: T) => any): any;
    catch(func: (value: any) => any): Promise<any>;
    static reject(reason?: any): Deferred<never>;
    static resolve<T = any>(value?: T): Deferred<T>;
}
export declare function merge(a: any, ...objs: any[]): any;
export declare function wrapTryCatch(method: Function, onError: (error: RoomException, methodName: string) => void, exceptionClass: Type<RoomException>, methodName: string, rethrow?: boolean, ...additionalErrorArgs: any[]): (...args: any[]) => any;
export declare class HttpServerMock extends EventEmitter {
}
