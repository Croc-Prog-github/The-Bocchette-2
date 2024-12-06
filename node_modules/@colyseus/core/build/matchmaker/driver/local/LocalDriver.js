var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var LocalDriver_exports = {};
__export(LocalDriver_exports, {
  LocalDriver: () => LocalDriver
});
module.exports = __toCommonJS(LocalDriver_exports);
var import_Logger = require("../../../Logger.js");
var import_Query = require("./Query.js");
var import_RoomData = require("./RoomData.js");
class LocalDriver {
  constructor() {
    this.rooms = [];
  }
  createInstance(initialValues = {}) {
    return new import_RoomData.RoomData(initialValues, this.rooms);
  }
  has(roomId) {
    return this.rooms.some((room) => room.roomId === roomId);
  }
  query(conditions, sortOptions) {
    const query = new import_Query.Query(this.rooms, conditions);
    if (sortOptions) {
      query.sort(sortOptions);
    }
    return query.filter(conditions);
  }
  cleanup(processId) {
    const cachedRooms = this.query({ processId });
    import_Logger.logger.debug("> Removing stale rooms by processId:", processId, `(${cachedRooms.length} rooms found)`);
    cachedRooms.forEach((room) => room.remove());
    return Promise.resolve();
  }
  findOne(conditions, sortOptions) {
    const query = new import_Query.Query(this.rooms, conditions);
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
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LocalDriver
});
