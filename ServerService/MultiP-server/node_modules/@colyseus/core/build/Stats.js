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
var Stats_exports = {};
__export(Stats_exports, {
  excludeProcess: () => excludeProcess,
  fetchAll: () => fetchAll,
  getGlobalCCU: () => getGlobalCCU,
  local: () => local,
  persist: () => persist,
  reset: () => reset
});
module.exports = __toCommonJS(Stats_exports);
var import_MatchMaker = require("./MatchMaker");
let local = {
  roomCount: 0,
  ccu: 0
};
async function fetchAll() {
  const allStats = [];
  const allProcesses = await import_MatchMaker.presence.hgetall(getRoomCountKey());
  for (let remoteProcessId in allProcesses) {
    if (remoteProcessId === import_MatchMaker.processId) {
      allStats.push({ processId: import_MatchMaker.processId, roomCount: local.roomCount, ccu: local.ccu });
    } else {
      const [roomCount, ccu] = allProcesses[remoteProcessId].split(",").map(Number);
      allStats.push({ processId: remoteProcessId, roomCount, ccu });
    }
  }
  return allStats;
}
let lastPersisted = 0;
let persistTimeout = void 0;
const persistInterval = 1e3;
function persist(forceNow = false) {
  const now = Date.now();
  if (forceNow || now - lastPersisted > persistInterval) {
    lastPersisted = now;
    return import_MatchMaker.presence.hset(getRoomCountKey(), import_MatchMaker.processId, `${local.roomCount},${local.ccu}`);
  } else {
    clearTimeout(persistTimeout);
    persistTimeout = setTimeout(persist, persistInterval);
  }
}
function reset(_persist = true) {
  local.roomCount = 0;
  local.ccu = 0;
  if (_persist) {
    lastPersisted = 0;
    clearTimeout(persistTimeout);
    persist();
  }
}
function excludeProcess(_processId) {
  return import_MatchMaker.presence.hdel(getRoomCountKey(), _processId);
}
async function getGlobalCCU() {
  const allStats = await fetchAll();
  return allStats.reduce((prev, next) => prev + next.ccu, 0);
}
function getRoomCountKey() {
  return "roomcount";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  excludeProcess,
  fetchAll,
  getGlobalCCU,
  local,
  persist,
  reset
});
