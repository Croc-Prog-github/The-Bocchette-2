import { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';
import { IRoomListingData, MatchMakerDriver, QueryHelpers, RoomListingData } from '@colyseus/core';
import { RoomData } from './RoomData';
export declare class RedisDriver implements MatchMakerDriver {
    private readonly _client;
    constructor(options?: number | string | RedisOptions | ClusterNode[], clusterOptions?: ClusterOptions);
    createInstance(initialValues?: Partial<IRoomListingData>): RoomData;
    has(roomId: string): Promise<boolean>;
    find(conditions: Partial<IRoomListingData>): Promise<RoomData[]>;
    cleanup(processId: string): Promise<void>;
    findOne(conditions: Partial<IRoomListingData>): QueryHelpers<RoomListingData>;
    private _concurrentRoomCacheRequest?;
    private _roomCacheRequestByName;
    private getRooms;
    shutdown(): Promise<void>;
    clear(): void;
}
