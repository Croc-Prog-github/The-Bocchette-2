import type { Room } from '../Room';
import { IRoomListingData } from './driver/interfaces';
export declare function updateLobby(room: Room, removed?: boolean): void;
export declare function subscribeLobby(callback: (roomId: string, roomListing: IRoomListingData) => void): Promise<() => any>;
