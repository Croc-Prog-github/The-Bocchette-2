// packages/core/src/matchmaker/driver/index.ts
import { debugMatchMaking } from "../../Debug";
import { Query } from "./Query";
import { RoomCache } from "./RoomData";
var LocalDriver = class {
  constructor() {
    this.rooms = [];
  }
  createInstance(initialValues = {}) {
    return new RoomCache(initialValues, this.rooms);
  }
  has(roomId) {
    return this.rooms.some((room) => room.roomId === roomId);
  }
  find(conditions) {
    return this.rooms.filter((room) => {
      for (const field in conditions) {
        if (conditions.hasOwnProperty(field) && room[field] !== conditions[field]) {
          return false;
        }
      }
      return true;
    });
  }
  cleanup(processId) {
    const cachedRooms = this.find({ processId });
    debugMatchMaking("removing stale rooms by processId %s (%s rooms found)", processId, cachedRooms.length);
    cachedRooms.forEach((room) => room.remove());
    return Promise.resolve();
  }
  findOne(conditions) {
    return new Query(this.rooms, conditions);
  }
  clear() {
    this.rooms = [];
  }
  shutdown() {
  }
};
export {
  LocalDriver
};
