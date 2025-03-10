import type { Iterator } from "@colyseus/schema";
export type BufferLike = number[] | Uint8Array | Buffer;
export interface Serializer<State> {
    setState(data: BufferLike, it?: Iterator): void;
    getState(): State;
    patch(data: BufferLike, it?: Iterator): void;
    teardown(): void;
    handshake?(bytes: BufferLike, it?: any): void;
}
export declare function registerSerializer(id: string, serializer: any): void;
export declare function getSerializer(id: string): any;
