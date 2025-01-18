'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var events = require('events');
var Lobby = require('./Lobby.js');

const INVALID_OPTION_KEYS = [
    'clients',
    'locked',
    'private',
    // 'maxClients', - maxClients can be useful as filter options
    'metadata',
    'name',
    'processId',
    'roomId',
];
class RegisteredHandler extends events.EventEmitter {
    klass;
    options;
    filterOptions = [];
    sortOptions;
    constructor(klass, options) {
        super();
        if (typeof (klass) !== 'function') {
            console.debug('You are likely not importing your room class correctly.');
            throw new Error(`class is expected but ${typeof (klass)} was provided.`);
        }
        this.klass = klass;
        this.options = options;
    }
    enableRealtimeListing() {
        this.on('create', (room) => Lobby.updateLobby(room));
        this.on('lock', (room) => Lobby.updateLobby(room));
        this.on('unlock', (room) => Lobby.updateLobby(room));
        this.on('join', (room) => Lobby.updateLobby(room));
        this.on('leave', (room, _, willDispose) => {
            if (!willDispose) {
                Lobby.updateLobby(room);
            }
        });
        this.on('dispose', (room) => Lobby.updateLobby(room, true));
        return this;
    }
    filterBy(options) {
        this.filterOptions = options;
        return this;
    }
    sortBy(options) {
        this.sortOptions = options;
        return this;
    }
    getFilterOptions(options) {
        return this.filterOptions.reduce((prev, curr, i, arr) => {
            const field = arr[i];
            if (options[field]) {
                if (INVALID_OPTION_KEYS.indexOf(field) !== -1) {
                    console.warn(`option "${field}" has internal usage and is going to be ignored.`);
                }
                else {
                    prev[field] = options[field];
                }
            }
            return prev;
        }, {});
    }
}

exports.INVALID_OPTION_KEYS = INVALID_OPTION_KEYS;
exports.RegisteredHandler = RegisteredHandler;
//# sourceMappingURL=RegisteredHandler.js.map
