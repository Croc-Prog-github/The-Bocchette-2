import { IRoomCache } from '../matchmaker/driver/local/LocalDriver.js';
import { Room } from '../Room.js';
import { Client } from '../Transport.js';
export interface FilterInput {
    name?: string;
    metadata?: any;
}
export interface LobbyOptions {
    filter?: FilterInput;
}
export declare class LobbyRoom extends Room {
    rooms: IRoomCache[];
    unsubscribeLobby: () => void;
    clientOptions: {
        [sessionId: string]: LobbyOptions;
    };
    onCreate(options: any): Promise<void>;
    onJoin(client: Client, options: LobbyOptions): void;
    onLeave(client: Client): void;
    onDispose(): void;
    protected filterItemsForClient(options: LobbyOptions): IRoomCache[];
    protected filterItemForClient(room: IRoomCache, filter?: LobbyOptions['filter']): boolean;
}
