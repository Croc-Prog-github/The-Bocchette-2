/**
 * Matchmaking controller
 * (for interoperability between different http frameworks, e.g. express, uWebSockets.js, etc)
 */
/// <reference types="node" />
import { IncomingMessage } from "http";
import * as matchMaker from "../MatchMaker";
declare const _default: {
    DEFAULT_CORS_HEADERS: {
        'Access-Control-Allow-Headers': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Credentials': string;
        'Access-Control-Allow-Origin': string;
        'Access-Control-Max-Age': string;
    };
    exposedMethods: string[];
    allowedRoomNameChars: RegExp;
    matchmakeRoute: string;
    /**
     * You can manually change the default corsHeaders by overwriting the `getCorsHeaders()` method:
     *    ```
     *    import { matchMaker } from "@colyseus/core";
     *    matchMaker.controller.getCorsHeaders = function(req) {
     *      if (req.headers.referer !== "xxx") {
     *      }
     *
     *      return {
     *        'Access-Control-Allow-Origin': 'safedomain.com',
     *      }
     *    }
     *    ```
     */
    getCorsHeaders(req: IncomingMessage): {
        [header: string]: string;
    };
    getAvailableRooms(roomName: string): Promise<import("./driver").RoomListingData<any>[]>;
    invokeMethod(method: string, roomName: string, clientOptions?: matchMaker.ClientOptions, authOptions?: matchMaker.AuthOptions): Promise<any>;
};
export default _default;
