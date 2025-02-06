import { SortOptions } from '../api.js';
export declare class Query<T> {
    private $rooms;
    private conditions;
    constructor(rooms: any[], conditions: any);
    sort(options: SortOptions): void;
    filter(conditions: any): T[];
    then(resolve: any, reject: any): any;
}
