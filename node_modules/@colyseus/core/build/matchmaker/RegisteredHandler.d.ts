/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage } from 'http';
import { EventEmitter } from 'events';
import { RoomListingData, SortOptions } from './driver/interfaces';
import { Room } from './../Room';
import { Type } from '../utils/types';
export declare const INVALID_OPTION_KEYS: Array<keyof RoomListingData>;
export type ValidateAuthTokenCallback = (token: string, request?: IncomingMessage) => Promise<any>;
export declare class RegisteredHandler extends EventEmitter {
    klass: Type<Room>;
    options: any;
    filterOptions: string[];
    sortOptions?: SortOptions;
    constructor(klass: Type<Room>, options: any);
    enableRealtimeListing(): this;
    filterBy(options: string[]): this;
    sortBy(options: SortOptions): this;
    getFilterOptions(options: any): {};
}
