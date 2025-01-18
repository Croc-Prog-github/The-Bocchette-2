'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Query = require('./Query.js');
var RoomData = require('./RoomData.js');

class LocalDriver {
    rooms = [];
    createInstance(initialValues = {}) {
        return new RoomData.RoomCache(initialValues, this.rooms);
    }
    find(conditions) {
        return this.rooms.filter(((room) => {
            for (const field in conditions) {
                if (conditions.hasOwnProperty(field) &&
                    room[field] !== conditions[field]) {
                    return false;
                }
            }
            return true;
        }));
    }
    findOne(conditions) {
        return new Query.Query(this.rooms, conditions);
    }
    clear() {
        this.rooms = [];
    }
    shutdown() { }
}

exports.LocalDriver = LocalDriver;
//# sourceMappingURL=index.js.map
