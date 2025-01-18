'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Protocol = require('../Protocol.js');
var ServerError = require('../errors/ServerError.js');
var MatchMaker = require('../MatchMaker.js');

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
    return MatchMaker.query(conditions);
}
async function invokeMethod(method, roomName, clientOptions = {}) {
    if (exposedMethods.indexOf(method) === -1) {
        throw new ServerError.ServerError(Protocol.ErrorCode.MATCHMAKE_NO_HANDLER, `invalid method "${method}"`);
    }
    try {
        return await MatchMaker[method](roomName, clientOptions);
    }
    catch (e) {
        throw new ServerError.ServerError(e.code || Protocol.ErrorCode.MATCHMAKE_UNHANDLED, e.message);
    }
}

exports.getAvailableRooms = getAvailableRooms;
exports.invokeMethod = invokeMethod;
//# sourceMappingURL=controller.js.map
