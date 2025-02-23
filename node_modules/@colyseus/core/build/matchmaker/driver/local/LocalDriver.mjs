// packages/core/src/matchmaker/driver/local/LocalDriver.ts
import { debugMatchMaking } from "../../../Debug.mjs";
import { Query } from "./Query.mjs";
import { RoomData } from "./RoomData.mjs";
var LocalDriver = class {
  constructor() {
    this.rooms = [];
  }
  createInstance(initialValues = {}) {
    return new RoomData(initialValues, this.rooms);
  }
  has(roomId) {
    return this.rooms.some((room) => room.roomId === roomId);
  }
  query(conditions, sortOptions) {
    const query = new Query(this.rooms, conditions);
    if (sortOptions) {
      query.sort(sortOptions);
    }
    return query.filter(conditions);
  }
  cleanup(processId) {
    const cachedRooms = this.query({ processId });
    debugMatchMaking("removing stale rooms by processId %s (%s rooms found)", processId, cachedRooms.length);
    cachedRooms.forEach((room) => room.remove());
    return Promise.resolve();
  }
  findOne(conditions, sortOptions) {
    const query = new Query(this.rooms, conditions);
    if (sortOptions) {
      query.sort(sortOptions);
    }
    return query;
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
