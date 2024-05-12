export type Stats = {
    roomCount: number;
    ccu: number;
};
export declare let local: Stats;
export declare function fetchAll(): Promise<(Stats & {
    processId: string;
})[]>;
export declare function persist(forceNow?: boolean): any;
export declare function reset(_persist?: boolean): void;
export declare function excludeProcess(_processId: string): boolean | Promise<boolean>;
export declare function getGlobalCCU(): Promise<number>;
