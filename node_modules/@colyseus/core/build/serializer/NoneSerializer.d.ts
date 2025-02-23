import { Client } from '../Transport.js';
import { Serializer } from './Serializer.js';
export declare class NoneSerializer<T = any> implements Serializer<T> {
    id: string;
    reset(data: any): void;
    getFullState(client?: Client): any;
    applyPatches(clients: Client[], state: T): boolean;
}
