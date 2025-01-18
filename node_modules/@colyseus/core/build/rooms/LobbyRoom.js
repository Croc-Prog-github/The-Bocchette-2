'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MatchMaker = require('../MatchMaker.js');
var Lobby = require('../matchmaker/Lobby.js');
var Room = require('../Room.js');

class LobbyRoom extends Room.Room {
    rooms = [];
    unsubscribeLobby;
    clientOptions = {};
    async onCreate(options) {
        // prevent LobbyRoom to notify itself
        this.listing.unlisted = true;
        this.unsubscribeLobby = await Lobby.subscribeLobby((roomId, data) => {
            const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId);
            const clients = this.clients.filter((client) => this.clientOptions[client.sessionId]);
            if (!data) {
                // remove room listing data
                if (roomIndex !== -1) {
                    const previousData = this.rooms[roomIndex];
                    this.rooms.splice(roomIndex, 1);
                    clients.forEach((client) => {
                        if (this.filterItemForClient(previousData, this.clientOptions[client.sessionId].filter)) {
                            client.send('-', roomId);
                        }
                    });
                }
            }
            else if (roomIndex === -1) {
                // append room listing data
                this.rooms.push(data);
                clients.forEach((client) => {
                    if (this.filterItemForClient(data, this.clientOptions[client.sessionId].filter)) {
                        client.send('+', [roomId, data]);
                    }
                });
            }
            else {
                const previousData = this.rooms[roomIndex];
                // replace room listing data
                this.rooms[roomIndex] = data;
                clients.forEach((client) => {
                    const hadData = this.filterItemForClient(previousData, this.clientOptions[client.sessionId].filter);
                    const hasData = this.filterItemForClient(data, this.clientOptions[client.sessionId].filter);
                    if (hadData && !hasData) {
                        client.send('-', roomId);
                    }
                    else if (hasData) {
                        client.send('+', [roomId, data]);
                    }
                });
            }
        });
        this.rooms = await MatchMaker.query({ private: false, unlisted: false });
        this.onMessage('filter', (client, filter) => {
            this.clientOptions[client.sessionId].filter = filter;
            client.send('rooms', this.filterItemsForClient(this.clientOptions[client.sessionId]));
        });
    }
    onJoin(client, options) {
        this.clientOptions[client.sessionId] = options || {};
        client.send('rooms', this.filterItemsForClient(this.clientOptions[client.sessionId]));
    }
    onLeave(client) {
        delete this.clientOptions[client.sessionId];
    }
    onDispose() {
        if (this.unsubscribeLobby) {
            this.unsubscribeLobby();
        }
    }
    filterItemsForClient(options) {
        const filter = options.filter;
        return (filter)
            ? this.rooms.filter((room) => this.filterItemForClient(room, filter))
            : this.rooms;
    }
    filterItemForClient(room, filter) {
        if (!filter) {
            return true;
        }
        let isAllowed = true;
        if (filter.name !== room.name) {
            isAllowed = false;
        }
        if (filter.metadata) {
            for (const field in filter.metadata) {
                if (room.metadata[field] !== filter.metadata[field]) {
                    isAllowed = false;
                    break;
                }
            }
        }
        return isAllowed;
    }
}

exports.LobbyRoom = LobbyRoom;
//# sourceMappingURL=LobbyRoom.js.map
