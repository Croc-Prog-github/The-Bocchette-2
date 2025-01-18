'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchMaker = require('../MatchMaker.js');

const LOBBY_CHANNEL = '$lobby';
function updateLobby(room, removed = false) {
    const listing = room.listing;
    if (!listing.unlisted && !listing.private) {
        MatchMaker.presence.publish(LOBBY_CHANNEL, `${listing.roomId},${removed ? 1 : 0}`);
    }
}
async function subscribeLobby(callback) {
    const cb = async (message) => {
        const [roomId, isRemove] = message.split(',');
        if (isRemove === '1') {
            callback(roomId, null);
        }
        else {
            const room = (await MatchMaker.query({ roomId }))[0];
            callback(roomId, room);
        }
    };
    await MatchMaker.presence.subscribe(LOBBY_CHANNEL, cb);
    return () => MatchMaker.presence.unsubscribe(LOBBY_CHANNEL, cb);
}

exports.subscribeLobby = subscribeLobby;
exports.updateLobby = updateLobby;
//# sourceMappingURL=Lobby.js.map
