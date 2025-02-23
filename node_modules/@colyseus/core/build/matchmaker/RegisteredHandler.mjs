// packages/core/src/matchmaker/RegisteredHandler.ts
import { EventEmitter } from "events";
import { logger } from "../Logger.mjs";
import { updateLobby } from "./Lobby.mjs";
var INVALID_OPTION_KEYS = [
  "clients",
  "locked",
  "private",
  // 'maxClients', - maxClients can be useful as filter options
  "metadata",
  "name",
  "processId",
  "roomId"
];
var RegisteredHandler = class extends EventEmitter {
  constructor(name, klass, options) {
    super();
    this.name = name;
    this.klass = klass;
    this.options = options;
    this.filterOptions = [];
    if (typeof klass !== "function") {
      logger.debug("You are likely not importing your room class correctly.");
      throw new Error(`class is expected but ${typeof klass} was provided.`);
    }
  }
  enableRealtimeListing() {
    this.on("create", (room) => updateLobby(room));
    this.on("lock", (room) => updateLobby(room));
    this.on("unlock", (room) => updateLobby(room));
    this.on("join", (room) => updateLobby(room));
    this.on("leave", (room, _, willDispose) => {
      if (!willDispose) {
        updateLobby(room);
      }
    });
    this.on("dispose", (room) => updateLobby(room, false));
    this.on("visibility-change", (room, isVisible) => updateLobby(room, isVisible));
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
      if (options.hasOwnProperty(field)) {
        if (INVALID_OPTION_KEYS.indexOf(field) !== -1) {
          logger.warn(`option "${field}" has internal usage and is going to be ignored.`);
        } else {
          prev[field] = options[field];
        }
      }
      return prev;
    }, {});
  }
};
export {
  INVALID_OPTION_KEYS,
  RegisteredHandler
};
