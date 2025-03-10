import { Serializer } from "./Serializer";
import { Schema, Decoder, Iterator } from "@colyseus/schema";
import type { Room } from "../Room";
export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;
export declare function getStateCallbacks<T extends Schema>(room: Room<T>): import("@colyseus/schema").SchemaCallbackProxy<T>;
export declare class SchemaSerializer<T extends Schema = any> implements Serializer<T> {
    state: T;
    decoder: Decoder<T>;
    setState(encodedState: Buffer, it?: Iterator): void;
    getState(): T;
    patch(patches: Buffer, it?: Iterator): import("@colyseus/schema").DataChange<any, string>[];
    teardown(): void;
    handshake(bytes: Buffer, it?: Iterator): void;
}
