import { IRoomListingData, SortOptions, RoomListingData, QueryHelpers, MatchMakerDriver } from "./interfaces";
export type { IRoomListingData, SortOptions, RoomListingData, QueryHelpers, MatchMakerDriver };
import { RoomCache } from './RoomData';
export declare class LocalDriver implements MatchMakerDriver {
    rooms: RoomCache[];
    createInstance(initialValues?: any): any;
    has(roomId: string): boolean;
    find(conditions: Partial<IRoomListingData>): RoomCache[];
    cleanup(processId: string): Promise<void>;
    findOne(conditions: Partial<IRoomListingData>): QueryHelpers<RoomListingData>;
    clear(): void;
    shutdown(): void;
}
