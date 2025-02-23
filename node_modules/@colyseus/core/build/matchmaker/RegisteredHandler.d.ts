import { IncomingMessage } from 'http';
import { EventEmitter } from 'events';
import { RoomCache, SortOptions } from './driver/api.js';
import { Room } from './../Room.js';
import { Type } from '../utils/types.js';
export declare const INVALID_OPTION_KEYS: Array<keyof RoomCache>;
export type ValidateAuthTokenCallback = (token: string, request?: IncomingMessage) => Promise<any>;
export declare class RegisteredHandler extends EventEmitter {
    name: string;
    klass: Type<Room>;
    options: any;
    filterOptions: string[];
    sortOptions?: SortOptions;
    constructor(name: string, klass: Type<Room>, options: any);
    enableRealtimeListing(): this;
    filterBy(options: string[]): this;
    sortBy(options: SortOptions): this;
    getFilterOptions(options: any): {};
}
