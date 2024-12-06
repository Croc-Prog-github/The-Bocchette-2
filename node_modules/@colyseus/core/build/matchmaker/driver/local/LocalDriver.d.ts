import { IRoomCache, SortOptions, RoomCache, MatchMakerDriver } from '../api.js';
export type { IRoomCache, SortOptions, RoomCache, MatchMakerDriver };
import { RoomData } from './RoomData.js';
export declare class LocalDriver implements MatchMakerDriver {
    rooms: IRoomCache[];
    createInstance(initialValues?: any): RoomData;
    has(roomId: string): boolean;
    query(conditions: Partial<IRoomCache>, sortOptions?: SortOptions): RoomCache<any>[];
    cleanup(processId: string): Promise<void>;
    findOne(conditions: Partial<IRoomCache>, sortOptions?: SortOptions): Promise<RoomCache>;
    clear(): void;
    shutdown(): void;
}
