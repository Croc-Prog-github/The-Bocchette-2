import type { Schema } from "./Schema";
interface ChangeDump {
    ops: {
        ADD?: number;
        REMOVE?: number;
        REPLACE?: number;
    };
    refs: string[];
}
export declare function getIndent(level: number): string;
export declare function dumpChanges(schema: Schema): ChangeDump;
export declare function getNextPowerOf2(number: number): number;
export {};
