import { IRoomListingData, MatchMakerDriver, QueryHelpers, RoomListingData } from '@colyseus/core';
export declare class MongooseDriver implements MatchMakerDriver {
    constructor(connectionURI?: string);
    createInstance(initialValues?: any): RoomListingData<any>;
    find(conditions: Partial<IRoomListingData>, additionalProjectionFields?: {}): Promise<RoomListingData<any>[]>;
    findOne(conditions: Partial<IRoomListingData>): QueryHelpers<RoomListingData<any>>;
    clear(): Promise<void>;
    shutdown(): Promise<void>;
}
