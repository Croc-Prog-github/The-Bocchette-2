import { IRoomListingData, SortOptions, RoomListingData, QueryHelpers, MatchMakerDriver } from "./interfaces";
export type { IRoomListingData, SortOptions, RoomListingData, QueryHelpers, MatchMakerDriver };
import { RoomCache } from './RoomData';
export declare class LocalDriver implements MatchMakerDriver {
    rooms: RoomCache[];
    createInstance(initialValues?: any): RoomCache;
    has(roomId: string): boolean;
    find(conditions: Partial<IRoomListingData>): RoomCache[];
    cleanup(processId: string): Promise<void>;
    findOne(conditions: Partial<IRoomListingData>): QueryHelpers<RoomListingData<any>>;
    clear(): void;
    shutdown(): void;
}
