import { Deferred } from './utils/Utils';
import { RegisteredHandler } from './matchmaker/RegisteredHandler';
import { Room } from './Room';
import { Presence } from './presence/Presence';
import { IRoomListingData, RoomListingData, MatchMakerDriver } from './matchmaker/driver';
import controller from './matchmaker/controller';
import * as stats from "./Stats";
import { Type } from './utils/types';
export { controller, stats, type MatchMakerDriver };
export type ClientOptions = any;
export type AuthOptions = {
    token?: string;
    request?: any;
};
export type SelectProcessIdCallback = (roomName: string, clientOptions: ClientOptions) => Promise<string>;
export interface SeatReservation {
    sessionId: string;
    room: RoomListingData;
    devMode?: boolean;
}
export declare let publicAddress: string;
export declare let processId: string;
export declare let presence: Presence;
export declare let driver: MatchMakerDriver;
export declare let selectProcessIdToCreateRoom: SelectProcessIdCallback;
export declare function setHealthChecksEnabled(value: boolean): void;
export declare let isGracefullyShuttingDown: boolean;
export declare let onReady: Deferred;
export declare enum MatchMakerState {
    INITIALIZING = 0,
    READY = 1,
    SHUTTING_DOWN = 2
}
/**
 * Internal MatchMaker state
 */
export declare let state: MatchMakerState;
/**
 * @private
 */
export declare function setup(_presence?: Presence, _driver?: MatchMakerDriver, _publicAddress?: string, _selectProcessIdToCreateRoom?: SelectProcessIdCallback): Promise<void>;
/**
 * - Accept receiving remote room creation requests
 * - Check for leftover/invalid processId's on startup
 * @private
 */
export declare function accept(): Promise<void>;
/**
 * Join or create into a room and return seat reservation
 */
export declare function joinOrCreate(roomName: string, clientOptions?: ClientOptions, authOptions?: AuthOptions): Promise<SeatReservation>;
/**
 * Create a room and return seat reservation
 */
export declare function create(roomName: string, clientOptions?: ClientOptions, authOptions?: AuthOptions): Promise<SeatReservation>;
/**
 * Join a room and return seat reservation
 */
export declare function join(roomName: string, clientOptions?: ClientOptions, authOptions?: AuthOptions): Promise<SeatReservation>;
/**
 * Join a room by id and return seat reservation
 */
export declare function reconnect(roomId: string, clientOptions?: ClientOptions): Promise<{
    room: RoomListingData<any>;
    sessionId: any;
}>;
/**
 * Join a room by id and return client seat reservation. An exception is thrown if a room is not found for roomId.
 *
 * @param roomId - The Id of the specific room instance.
 * @param clientOptions - Options for the client seat reservation (for `onJoin`/`onAuth`)
 * @param authOptions - Optional authentication token
 *
 * @returns Promise<SeatReservation> - A promise which contains `sessionId` and `RoomListingData`.
 */
export declare function joinById(roomId: string, clientOptions?: ClientOptions, authOptions?: AuthOptions): Promise<SeatReservation>;
/**
 * Perform a query for all cached rooms
 */
export declare function query(conditions?: Partial<IRoomListingData>): Promise<RoomListingData<any>[]>;
/**
 * Find for a public and unlocked room available.
 *
 * @param roomName - The Id of the specific room.
 * @param clientOptions - Options for the client seat reservation (for `onJoin`/`onAuth`).
 *
 * @returns Promise<RoomListingData> - A promise contaning an object which includes room metadata and configurations.
 */
export declare function findOneRoomAvailable(roomName: string, clientOptions: ClientOptions): Promise<RoomListingData>;
/**
 * Call a method or return a property on a remote room.
 *
 * @param roomId - The Id of the specific room instance.
 * @param method - Method or attribute to call or retrive.
 * @param args - Array of arguments for the method
 *
 * @returns Promise<any> - Returned value from the called or retrieved method/attribute.
 */
export declare function remoteRoomCall<R = any>(roomId: string, method: string, args?: any[], rejectionTimeout?: number): Promise<R>;
export declare function defineRoomType<T extends Type<Room>>(roomName: string, klass: T, defaultOptions?: Parameters<NonNullable<InstanceType<T>['onCreate']>>[0]): RegisteredHandler;
export declare function removeRoomType(roomName: string): void;
export declare function hasHandler(roomName: string): boolean;
export declare function getHandler(roomName: string): RegisteredHandler;
export declare function getRoomClass(roomName: string): Type<Room>;
/**
 * Creates a new room.
 *
 * @param roomName - The identifier you defined on `gameServer.define()`
 * @param clientOptions - Options for `onCreate`
 *
 * @returns Promise<RoomListingData> - A promise contaning an object which includes room metadata and configurations.
 */
export declare function createRoom(roomName: string, clientOptions: ClientOptions): Promise<RoomListingData>;
export declare function handleCreateRoom(roomName: string, clientOptions: ClientOptions, restoringRoomId?: string): Promise<RoomListingData>;
export declare function getRoomById(roomId: string): Room<any, any>;
/**
 * Disconnects every client on every room in the current process.
 */
export declare function disconnectAll(closeCode?: number): Promise<any>[];
export declare function gracefullyShutdown(): Promise<any>;
/**
 * Reserve a seat for a client in a room
 */
export declare function reserveSeatFor(room: RoomListingData, options: ClientOptions, authData?: any): Promise<SeatReservation>;
export declare function cleanupStaleRooms(roomName: string): Promise<void>;
/**
 * Perform health check on all processes
 */
export declare function healthCheckAllProcesses(): Promise<void>;
export declare function healthCheckProcessId(processId: string): Promise<any>;
