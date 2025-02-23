import type { Room } from '../Room.js';
import { IRoomCache } from './driver/api.js';
export declare function updateLobby(room: Room, removed?: boolean): void;
export declare function subscribeLobby(callback: (roomId: string, roomListing: IRoomCache) => void): Promise<() => any>;
