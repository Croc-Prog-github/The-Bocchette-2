/**
 * Matchmaking controller
 * (for interoperability between different http frameworks, e.g. express, uWebSockets.js, etc)
 */
import { IncomingMessage } from 'http';
import * as matchMaker from '../MatchMaker.js';
import type { AuthContext } from '../Transport.js';
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
    invokeMethod(method: string, roomName: string, clientOptions?: matchMaker.ClientOptions, authOptions?: AuthContext): Promise<any>;
};
export default _default;
