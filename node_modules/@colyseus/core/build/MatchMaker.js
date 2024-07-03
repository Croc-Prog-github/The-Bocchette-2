var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var MatchMaker_exports = {};
__export(MatchMaker_exports, {
  MatchMakerState: () => MatchMakerState,
  accept: () => accept,
  cleanupStaleRooms: () => cleanupStaleRooms,
  controller: () => import_controller.default,
  create: () => create,
  createRoom: () => createRoom,
  defineRoomType: () => defineRoomType,
  disconnectAll: () => disconnectAll,
  driver: () => driver,
  findOneRoomAvailable: () => findOneRoomAvailable,
  getHandler: () => getHandler,
  getRoomById: () => getRoomById,
  getRoomClass: () => getRoomClass,
  gracefullyShutdown: () => gracefullyShutdown,
  handleCreateRoom: () => handleCreateRoom,
  hasHandler: () => hasHandler,
  healthCheckAllProcesses: () => healthCheckAllProcesses,
  healthCheckProcessId: () => healthCheckProcessId,
  isGracefullyShuttingDown: () => isGracefullyShuttingDown,
  join: () => join,
  joinById: () => joinById,
  joinOrCreate: () => joinOrCreate,
  onReady: () => onReady,
  presence: () => presence,
  processId: () => processId,
  publicAddress: () => publicAddress,
  query: () => query,
  reconnect: () => reconnect,
  remoteRoomCall: () => remoteRoomCall,
  removeRoomType: () => removeRoomType,
  reserveSeatFor: () => reserveSeatFor,
  selectProcessIdToCreateRoom: () => selectProcessIdToCreateRoom,
  setHealthChecksEnabled: () => setHealthChecksEnabled,
  setup: () => setup,
  state: () => state,
  stats: () => stats
});
module.exports = __toCommonJS(MatchMaker_exports);
var import_Protocol = require("./Protocol");
var import_IPC = require("./IPC");
var import_Utils = require("./utils/Utils");
var import_DevMode = require("./utils/DevMode");
var import_RegisteredHandler = require("./matchmaker/RegisteredHandler");
var import_Room = require("./Room");
var import_LocalPresence = require("./presence/LocalPresence");
var import_Debug = require("./Debug");
var import_SeatReservationError = require("./errors/SeatReservationError");
var import_ServerError = require("./errors/ServerError");
var import_driver = require("./matchmaker/driver");
var import_controller = __toESM(require("./matchmaker/controller"));
var stats = __toESM(require("./Stats"));
var import_Logger = require("./Logger");
var import_discovery = require("./discovery");
const handlers = {};
const rooms = {};
let publicAddress;
let processId;
let presence;
let driver;
let selectProcessIdToCreateRoom;
let enableHealthChecks = true;
function setHealthChecksEnabled(value) {
  enableHealthChecks = value;
}
let isGracefullyShuttingDown;
let onReady = new import_Utils.Deferred();
var MatchMakerState = /* @__PURE__ */ ((MatchMakerState2) => {
  MatchMakerState2[MatchMakerState2["INITIALIZING"] = 0] = "INITIALIZING";
  MatchMakerState2[MatchMakerState2["READY"] = 1] = "READY";
  MatchMakerState2[MatchMakerState2["SHUTTING_DOWN"] = 2] = "SHUTTING_DOWN";
  return MatchMakerState2;
})(MatchMakerState || {});
let state;
async function setup(_presence, _driver, _publicAddress, _selectProcessIdToCreateRoom) {
  if (onReady === void 0) {
    onReady = new import_Utils.Deferred();
  }
  isGracefullyShuttingDown = false;
  state = 0 /* INITIALIZING */;
  presence = _presence || new import_LocalPresence.LocalPresence();
  driver = _driver || new import_driver.LocalDriver();
  publicAddress = _publicAddress;
  stats.reset(false);
  if (import_DevMode.isDevMode) {
    processId = await (0, import_DevMode.getPreviousProcessId)(await (0, import_discovery.getHostname)());
  }
  if (!processId) {
    processId = (0, import_Utils.generateId)();
  }
  selectProcessIdToCreateRoom = _selectProcessIdToCreateRoom || async function() {
    return (await stats.fetchAll()).sort((p1, p2) => p1.roomCount > p2.roomCount ? 1 : -1)[0]?.processId || processId;
  };
  onReady.resolve();
}
async function accept() {
  await onReady;
  await (0, import_IPC.subscribeIPC)(presence, processId, getProcessChannel(), (method, args) => {
    if (method === "healthcheck") {
      return true;
    } else {
      return handleCreateRoom.apply(void 0, args);
    }
  });
  if (enableHealthChecks) {
    await healthCheckAllProcesses();
  }
  state = 1 /* READY */;
  await stats.persist();
  if (import_DevMode.isDevMode) {
    await (0, import_DevMode.reloadFromCache)();
  }
}
async function joinOrCreate(roomName, clientOptions = {}, authOptions) {
  return await (0, import_Utils.retry)(async () => {
    const authData = await callOnAuth(roomName, authOptions);
    let room = await findOneRoomAvailable(roomName, clientOptions);
    if (!room) {
      room = await createRoom(roomName, clientOptions);
    }
    return await reserveSeatFor(room, clientOptions, authData);
  }, 5, [import_SeatReservationError.SeatReservationError]);
}
async function create(roomName, clientOptions = {}, authOptions) {
  const authData = await callOnAuth(roomName, authOptions);
  const room = await createRoom(roomName, clientOptions);
  return reserveSeatFor(room, clientOptions, authData);
}
async function join(roomName, clientOptions = {}, authOptions) {
  return await (0, import_Utils.retry)(async () => {
    const authData = await callOnAuth(roomName, authOptions);
    const room = await findOneRoomAvailable(roomName, clientOptions);
    if (!room) {
      throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_INVALID_CRITERIA, `no rooms found with provided criteria`);
    }
    return reserveSeatFor(room, clientOptions, authData);
  });
}
async function reconnect(roomId, clientOptions = {}) {
  const room = await driver.findOne({ roomId });
  if (!room) {
    if (process.env.NODE_ENV !== "production") {
      import_Logger.logger.info(`\u274C room "${roomId}" has been disposed. Did you missed .allowReconnection()?
\u{1F449} https://docs.colyseus.io/server/room/#allowreconnection-client-seconds`);
    }
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_INVALID_ROOM_ID, `room "${roomId}" has been disposed.`);
  }
  const reconnectionToken = clientOptions.reconnectionToken;
  if (!reconnectionToken) {
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_UNHANDLED, `'reconnectionToken' must be provided for reconnection.`);
  }
  const sessionId = await remoteRoomCall(room.roomId, "checkReconnectionToken", [reconnectionToken]);
  if (sessionId) {
    return { room, sessionId };
  } else {
    if (process.env.NODE_ENV !== "production") {
      import_Logger.logger.info(`\u274C reconnection token invalid or expired. Did you missed .allowReconnection()?
\u{1F449} https://docs.colyseus.io/server/room/#allowreconnection-client-seconds`);
    }
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_EXPIRED, `reconnection token invalid or expired.`);
  }
}
async function joinById(roomId, clientOptions = {}, authOptions) {
  const room = await driver.findOne({ roomId });
  if (!room) {
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_INVALID_ROOM_ID, `room "${roomId}" not found`);
  } else if (room.locked) {
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_INVALID_ROOM_ID, `room "${roomId}" is locked`);
  }
  const authData = await callOnAuth(room.name, authOptions);
  return reserveSeatFor(room, clientOptions, authData);
}
async function query(conditions = {}) {
  return await driver.find(conditions);
}
async function findOneRoomAvailable(roomName, clientOptions) {
  return await awaitRoomAvailable(roomName, async () => {
    const handler = getHandler(roomName);
    const roomQuery = driver.findOne({
      locked: false,
      name: roomName,
      private: false,
      ...handler.getFilterOptions(clientOptions)
    });
    if (handler.sortOptions) {
      roomQuery.sort(handler.sortOptions);
    }
    return await roomQuery;
  });
}
async function remoteRoomCall(roomId, method, args, rejectionTimeout = import_Utils.REMOTE_ROOM_SHORT_TIMEOUT) {
  const room = rooms[roomId];
  if (!room) {
    try {
      return await (0, import_IPC.requestFromIPC)(presence, getRoomChannel(roomId), method, args, rejectionTimeout);
    } catch (e) {
      if (method === "_reserveSeat" && e.message === "ipc_timeout") {
        throw e;
      }
      const request = `${method}${args && " with args " + JSON.stringify(args) || ""}`;
      throw new import_ServerError.ServerError(
        import_Protocol.ErrorCode.MATCHMAKE_UNHANDLED,
        `remote room (${roomId}) timed out, requesting "${request}". (${rejectionTimeout}ms exceeded)`
      );
    }
  } else {
    return !args && typeof room[method] !== "function" ? room[method] : await room[method].apply(room, args && JSON.parse(JSON.stringify(args)));
  }
}
function defineRoomType(roomName, klass, defaultOptions) {
  const registeredHandler = new import_RegisteredHandler.RegisteredHandler(klass, defaultOptions);
  handlers[roomName] = registeredHandler;
  if (klass.prototype["onAuth"] !== import_Room.Room.prototype["onAuth"]) {
    if (klass["onAuth"] !== import_Room.Room["onAuth"]) {
      import_Logger.logger.info(`\u274C "${roomName}"'s onAuth() defined at the instance level will be ignored.`);
    }
  }
  if (!import_DevMode.isDevMode) {
    cleanupStaleRooms(roomName);
  }
  return registeredHandler;
}
function removeRoomType(roomName) {
  delete handlers[roomName];
  if (!import_DevMode.isDevMode) {
    cleanupStaleRooms(roomName);
  }
}
function hasHandler(roomName) {
  import_Logger.logger.warn("hasHandler() is deprecated. Use getHandler() instead.");
  return handlers[roomName] !== void 0;
}
function getHandler(roomName) {
  const handler = handlers[roomName];
  if (!handler) {
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_NO_HANDLER, `provided room name "${roomName}" not defined`);
  }
  return handler;
}
function getRoomClass(roomName) {
  return handlers[roomName]?.klass;
}
async function createRoom(roomName, clientOptions) {
  const selectedProcessId = state === 1 /* READY */ ? await selectProcessIdToCreateRoom(roomName, clientOptions) : processId;
  let room;
  if (selectedProcessId === void 0) {
    throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_UNHANDLED, `no processId available to create room ${roomName}`);
  } else if (selectedProcessId === processId) {
    room = await handleCreateRoom(roomName, clientOptions);
  } else {
    try {
      room = await (0, import_IPC.requestFromIPC)(
        presence,
        getProcessChannel(selectedProcessId),
        void 0,
        [roomName, clientOptions],
        import_Utils.REMOTE_ROOM_SHORT_TIMEOUT
      );
    } catch (e) {
      if (e.message === "ipc_timeout") {
        (0, import_Debug.debugAndPrintError)(`${e.message}: create room request timed out for ${roomName} on processId ${selectedProcessId}.`);
        if (enableHealthChecks) {
          await stats.excludeProcess(selectedProcessId);
        }
        room = await handleCreateRoom(roomName, clientOptions);
      } else {
        throw e;
      }
    }
  }
  if (import_DevMode.isDevMode) {
    presence.hset((0, import_DevMode.getRoomRestoreListKey)(), room.roomId, JSON.stringify({
      "clientOptions": clientOptions,
      "roomName": roomName,
      "processId": processId
    }));
  }
  return room;
}
async function handleCreateRoom(roomName, clientOptions, restoringRoomId) {
  const handler = getHandler(roomName);
  const room = new handler.klass();
  if (restoringRoomId && import_DevMode.isDevMode) {
    room.roomId = restoringRoomId;
  } else {
    room.roomId = (0, import_Utils.generateId)();
  }
  room.roomName = roomName;
  room.presence = presence;
  const additionalListingData = handler.getFilterOptions(clientOptions);
  if (publicAddress) {
    additionalListingData.publicAddress = publicAddress;
  }
  room.listing = driver.createInstance({
    name: roomName,
    processId,
    ...additionalListingData
  });
  if (room.onCreate) {
    try {
      await room.onCreate((0, import_Utils.merge)({}, clientOptions, handler.options));
    } catch (e) {
      (0, import_Debug.debugAndPrintError)(e);
      throw new import_ServerError.ServerError(
        e.code || import_Protocol.ErrorCode.MATCHMAKE_UNHANDLED,
        e.message
      );
    }
  }
  room["_internalState"] = import_Room.RoomInternalState.CREATED;
  room.listing.roomId = room.roomId;
  room.listing.maxClients = room.maxClients;
  (0, import_Debug.debugMatchMaking)("spawning '%s', roomId: %s, processId: %s", roomName, room.roomId, processId);
  stats.local.roomCount++;
  stats.persist();
  room._events.on("lock", lockRoom.bind(this, room));
  room._events.on("unlock", unlockRoom.bind(this, room));
  room._events.on("join", onClientJoinRoom.bind(this, room));
  room._events.on("leave", onClientLeaveRoom.bind(this, room));
  room._events.on("visibility-change", onVisibilityChange.bind(this, room));
  room._events.once("dispose", disposeRoom.bind(this, roomName, room));
  room._events.once("disconnect", () => {
    room._events.removeAllListeners("lock");
    room._events.removeAllListeners("unlock");
    room._events.removeAllListeners("visibility-change");
    room._events.removeAllListeners("dispose");
  });
  await createRoomReferences(room, true);
  await room.listing.save();
  handler.emit("create", room);
  return room.listing;
}
function getRoomById(roomId) {
  return rooms[roomId];
}
function disconnectAll(closeCode) {
  const promises = [];
  for (const roomId in rooms) {
    if (!rooms.hasOwnProperty(roomId)) {
      continue;
    }
    const room = rooms[roomId];
    room._events.removeAllListeners("leave");
    promises.push(room.disconnect(closeCode));
  }
  return promises;
}
async function gracefullyShutdown() {
  if (isGracefullyShuttingDown) {
    return Promise.reject("already_shutting_down");
  }
  isGracefullyShuttingDown = true;
  state = 2 /* SHUTTING_DOWN */;
  onReady = void 0;
  (0, import_Debug.debugMatchMaking)(`${processId} is shutting down!`);
  if (import_DevMode.isDevMode) {
    await (0, import_DevMode.cacheRoomHistory)(rooms);
  }
  await stats.excludeProcess(processId);
  await removeRoomsByProcessId(processId);
  presence.unsubscribe(getProcessChannel());
  return Promise.all(disconnectAll(
    import_DevMode.isDevMode ? import_Protocol.Protocol.WS_CLOSE_DEVMODE_RESTART : void 0
  ));
}
async function reserveSeatFor(room, options, authData) {
  const sessionId = (0, import_Utils.generateId)();
  (0, import_Debug.debugMatchMaking)(
    "reserving seat. sessionId: '%s', roomId: '%s', processId: '%s'",
    sessionId,
    room.roomId,
    processId
  );
  let successfulSeatReservation;
  try {
    successfulSeatReservation = await remoteRoomCall(
      room.roomId,
      "_reserveSeat",
      [sessionId, options, authData],
      import_Utils.REMOTE_ROOM_SHORT_TIMEOUT
    );
  } catch (e) {
    (0, import_Debug.debugMatchMaking)(e);
    if (e.message === "ipc_timeout" && !(enableHealthChecks && await healthCheckProcessId(room.processId))) {
      throw new import_SeatReservationError.SeatReservationError(`process ${room.processId} is not available.`);
    } else {
      successfulSeatReservation = false;
    }
  }
  if (!successfulSeatReservation) {
    throw new import_SeatReservationError.SeatReservationError(`${room.roomId} is already full.`);
  }
  const response = { room, sessionId };
  if (import_DevMode.isDevMode) {
    response.devMode = import_DevMode.isDevMode;
  }
  return response;
}
function callOnAuth(roomName, authOptions) {
  const roomClass = getRoomClass(roomName);
  return roomClass && roomClass["onAuth"] && roomClass["onAuth"] !== import_Room.Room["onAuth"] ? roomClass["onAuth"](authOptions.token, authOptions.request) : void 0;
}
async function cleanupStaleRooms(roomName) {
  await presence.del(getHandlerConcurrencyKey(roomName));
}
async function healthCheckAllProcesses() {
  const allStats = await stats.fetchAll();
  if (allStats.length > 0) {
    await Promise.all(
      allStats.filter((stat) => stat.processId !== processId).map((stat) => healthCheckProcessId(stat.processId))
    );
  }
}
const _healthCheckByProcessId = {};
function healthCheckProcessId(processId2) {
  if (_healthCheckByProcessId[processId2] !== void 0) {
    return _healthCheckByProcessId[processId2];
  }
  _healthCheckByProcessId[processId2] = new Promise(async (resolve, reject) => {
    import_Logger.logger.debug(`> Performing health-check against processId: '${processId2}'...`);
    try {
      const requestTime = Date.now();
      await (0, import_IPC.requestFromIPC)(
        presence,
        getProcessChannel(processId2),
        "healthcheck",
        [],
        import_Utils.REMOTE_ROOM_SHORT_TIMEOUT
      );
      import_Logger.logger.debug(`\u2705 Process '${processId2}' successfully responded (${Date.now() - requestTime}ms)`);
      resolve(true);
    } catch (e) {
      import_Logger.logger.debug(`\u274C Process '${processId2}' failed to respond. Cleaning it up.`);
      const isProcessExcluded = await stats.excludeProcess(processId2);
      if (isProcessExcluded && !import_DevMode.isDevMode) {
        await removeRoomsByProcessId(processId2);
      }
      resolve(false);
    } finally {
      delete _healthCheckByProcessId[processId2];
    }
  });
  return _healthCheckByProcessId[processId2];
}
async function removeRoomsByProcessId(processId2) {
  if (typeof driver.cleanup === "function") {
    await driver.cleanup(processId2);
  } else {
    const cachedRooms = await driver.find({ processId: processId2 }, { _id: 1 });
    import_Logger.logger.debug("> Removing stale rooms by processId:", processId2, `(${cachedRooms.length} rooms found)`);
    cachedRooms.forEach((room) => room.remove());
  }
}
async function createRoomReferences(room, init = false) {
  rooms[room.roomId] = room;
  if (init) {
    await (0, import_IPC.subscribeIPC)(
      presence,
      processId,
      getRoomChannel(room.roomId),
      (method, args) => {
        return !args && typeof room[method] !== "function" ? room[method] : room[method].apply(room, args);
      }
    );
  }
  return true;
}
async function awaitRoomAvailable(roomToJoin, callback) {
  return new Promise(async (resolve, reject) => {
    const concurrencyKey = getHandlerConcurrencyKey(roomToJoin);
    const concurrency = await presence.incr(concurrencyKey) - 1;
    const concurrencyTimeout = Math.min(concurrency * 100, 500);
    if (concurrency > 0) {
      (0, import_Debug.debugMatchMaking)(
        "receiving %d concurrent requests for joining '%s' (waiting %d ms)",
        concurrency,
        roomToJoin,
        concurrencyTimeout
      );
    }
    setTimeout(async () => {
      try {
        const result = await callback();
        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        await presence.decr(concurrencyKey);
      }
    }, concurrencyTimeout);
  });
}
function onClientJoinRoom(room, client) {
  stats.local.ccu++;
  stats.persist();
  handlers[room.roomName].emit("join", room, client);
}
function onClientLeaveRoom(room, client, willDispose) {
  stats.local.ccu--;
  stats.persist();
  handlers[room.roomName].emit("leave", room, client, willDispose);
}
function lockRoom(room) {
  handlers[room.roomName].emit("lock", room);
}
async function unlockRoom(room) {
  if (await createRoomReferences(room)) {
    handlers[room.roomName].emit("unlock", room);
  }
}
function onVisibilityChange(room, isInvisible) {
  handlers[room.roomName].emit("visibility-change", room, isInvisible);
}
async function disposeRoom(roomName, room) {
  (0, import_Debug.debugMatchMaking)("disposing '%s' (%s) on processId '%s' (graceful shutdown: %s)", roomName, room.roomId, processId, isGracefullyShuttingDown);
  room.listing.remove();
  if (!isGracefullyShuttingDown) {
    stats.local.roomCount--;
    stats.persist();
    if (import_DevMode.isDevMode) {
      await presence.hdel((0, import_DevMode.getRoomRestoreListKey)(), room.roomId);
    }
  }
  handlers[roomName].emit("dispose", room);
  presence.del(getHandlerConcurrencyKey(roomName));
  presence.unsubscribe(getRoomChannel(room.roomId));
  delete rooms[room.roomId];
}
function getRoomChannel(roomId) {
  return `$${roomId}`;
}
function getHandlerConcurrencyKey(name) {
  return `c:${name}`;
}
function getProcessChannel(id = processId) {
  return `p:${id}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MatchMakerState,
  accept,
  cleanupStaleRooms,
  controller,
  create,
  createRoom,
  defineRoomType,
  disconnectAll,
  driver,
  findOneRoomAvailable,
  getHandler,
  getRoomById,
  getRoomClass,
  gracefullyShutdown,
  handleCreateRoom,
  hasHandler,
  healthCheckAllProcesses,
  healthCheckProcessId,
  isGracefullyShuttingDown,
  join,
  joinById,
  joinOrCreate,
  onReady,
  presence,
  processId,
  publicAddress,
  query,
  reconnect,
  remoteRoomCall,
  removeRoomType,
  reserveSeatFor,
  selectProcessIdToCreateRoom,
  setHealthChecksEnabled,
  setup,
  state,
  stats
});
