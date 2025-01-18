import { Query } from './Query.mjs';
import { RoomCache } from './RoomData.mjs';

class LocalDriver {
    rooms = [];
    createInstance(initialValues = {}) {
        return new RoomCache(initialValues, this.rooms);
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
        return new Query(this.rooms, conditions);
    }
    clear() {
        this.rooms = [];
    }
    shutdown() { }
}

export { LocalDriver };
//# sourceMappingURL=index.mjs.map
