import { RoomCache, IRoomCache } from '../api.js';
export declare class RoomData implements RoomCache {
    clients: number;
    locked: boolean;
    private: boolean;
    maxClients: number;
    metadata: any;
    name: string;
    publicAddress: string;
    processId: string;
    roomId: string;
    createdAt: Date;
    unlisted: boolean;
    private $rooms;
    constructor(initialValues: any, rooms: IRoomCache[]);
    save(): void;
    updateOne(operations: any): void;
    remove(): void;
}
