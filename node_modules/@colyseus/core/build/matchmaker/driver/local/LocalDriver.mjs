// packages/core/src/matchmaker/driver/local/LocalDriver.ts
import { logger } from "../../../Logger.mjs";
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
    logger.debug("> Removing stale rooms by processId:", processId, `(${cachedRooms.length} rooms found)`);
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
