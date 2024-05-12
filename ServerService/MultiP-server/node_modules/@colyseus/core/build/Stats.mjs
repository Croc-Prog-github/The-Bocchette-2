import { presence, processId } from "./MatchMaker";
let local = {
  roomCount: 0,
  ccu: 0
};
async function fetchAll() {
  const allStats = [];
  const allProcesses = await presence.hgetall(getRoomCountKey());
  for (let remoteProcessId in allProcesses) {
    if (remoteProcessId === processId) {
      allStats.push({ processId, roomCount: local.roomCount, ccu: local.ccu });
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
    return presence.hset(getRoomCountKey(), processId, `${local.roomCount},${local.ccu}`);
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
  return presence.hdel(getRoomCountKey(), _processId);
}
async function getGlobalCCU() {
  const allStats = await fetchAll();
  return allStats.reduce((prev, next) => prev + next.ccu, 0);
}
function getRoomCountKey() {
  return "roomcount";
}
export {
  excludeProcess,
  fetchAll,
  getGlobalCCU,
  local,
  persist,
  reset
};
