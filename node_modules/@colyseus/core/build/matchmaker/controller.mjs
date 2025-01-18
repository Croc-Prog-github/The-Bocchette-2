import { ErrorCode } from '../Protocol.mjs';
import { ServerError } from '../errors/ServerError.mjs';
import * as MatchMaker from '../MatchMaker.mjs';
import { query } from '../MatchMaker.mjs';

/**
 * Matchmaking controller
 * (for interoperability between different http frameworks, e.g. express, uWebSockets.js, etc)
 */
const exposedMethods = ['joinOrCreate', 'create', 'join', 'joinById'];
function getAvailableRooms(roomName) {
    /**
    * list public & unlocked rooms
    */
    const conditions = {
        locked: false,
        private: false,
    };
    if (roomName) {
        conditions["name"] = roomName;
    }
    return query(conditions);
}
async function invokeMethod(method, roomName, clientOptions = {}) {
    if (exposedMethods.indexOf(method) === -1) {
        throw new ServerError(ErrorCode.MATCHMAKE_NO_HANDLER, `invalid method "${method}"`);
    }
    try {
        return await MatchMaker[method](roomName, clientOptions);
    }
    catch (e) {
        throw new ServerError(e.code || ErrorCode.MATCHMAKE_UNHANDLED, e.message);
    }
}

export { getAvailableRooms, invokeMethod };
//# sourceMappingURL=controller.mjs.map
