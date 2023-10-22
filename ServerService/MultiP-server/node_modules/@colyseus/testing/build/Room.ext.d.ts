/**
 * Room.ts augmentations
 * Monkey-patches some Room methods to improve the testing experience.
 */
import { Deferred, Client } from "@colyseus/core";
declare module "@colyseus/core" {
    interface Room {
        waitForMessage(messageType: string): Promise<[Client, any]>;
        waitForNextMessage(additionalDelay?: number): Promise<void>;
        waitForNextPatch(): Promise<void>;
        waitForNextSimulationTick(): Promise<void>;
        _waitingForMessage: [number, Deferred];
        _waitingForPatch: [number, Deferred];
    }
}
declare module "colyseus.js" {
    interface Room {
        waitForMessage(messageType: string, rejectTimeout?: number): Promise<any>;
        waitForNextMessage(additionalDelay?: number): Promise<[string, any]>;
        waitForNextPatch(): Promise<void>;
        _waitingForMessage: [number, Deferred];
        _waitingForPatch: [number, Deferred];
    }
}
