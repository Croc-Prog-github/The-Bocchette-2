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
var Room_exports = {};
__export(Room_exports, {
  DEFAULT_SEAT_RESERVATION_TIME: () => DEFAULT_SEAT_RESERVATION_TIME,
  Room: () => Room,
  RoomInternalState: () => RoomInternalState
});
module.exports = __toCommonJS(Room_exports);
var import_ws = __toESM(require("ws"));
var import_msgpackr = require("msgpackr");
var import_schema = require("@colyseus/schema");
var import_timer = __toESM(require("@gamestdio/timer"));
var import_events = require("events");
var import_Logger = require("./Logger");
var import_NoneSerializer = require("./serializer/NoneSerializer");
var import_SchemaSerializer = require("./serializer/SchemaSerializer");
var import_Protocol = require("./Protocol");
var import_Utils = require("./utils/Utils");
var import_DevMode = require("./utils/DevMode");
var import_Debug = require("./Debug");
var import_ServerError = require("./errors/ServerError");
var import_Transport = require("./Transport");
const DEFAULT_PATCH_RATE = 1e3 / 20;
const DEFAULT_SIMULATION_INTERVAL = 1e3 / 60;
const noneSerializer = new import_NoneSerializer.NoneSerializer();
const DEFAULT_SEAT_RESERVATION_TIME = Number(process.env.COLYSEUS_SEAT_RESERVATION_TIME || 15);
var RoomInternalState = /* @__PURE__ */ ((RoomInternalState2) => {
  RoomInternalState2[RoomInternalState2["CREATING"] = 0] = "CREATING";
  RoomInternalState2[RoomInternalState2["CREATED"] = 1] = "CREATED";
  RoomInternalState2[RoomInternalState2["DISPOSING"] = 2] = "DISPOSING";
  return RoomInternalState2;
})(RoomInternalState || {});
class Room {
  constructor(presence) {
    this.clock = new import_timer.default();
    this.#_autoDispose = true;
    this.maxClients = Infinity;
    this.patchRate = DEFAULT_PATCH_RATE;
    this.clients = new import_Transport.ClientArray();
    this._events = new import_events.EventEmitter();
    this.seatReservationTime = DEFAULT_SEAT_RESERVATION_TIME;
    this.reservedSeats = {};
    this.reservedSeatTimeouts = {};
    this._reconnections = {};
    this._reconnectingSessionId = /* @__PURE__ */ new Map();
    this.onMessageHandlers = {};
    this._serializer = noneSerializer;
    this._afterNextPatchQueue = [];
    this._internalState = 0 /* CREATING */;
    this._locked = false;
    this._lockedExplicitly = false;
    this._maxClientsReached = false;
    this.presence = presence;
    this._events.once("dispose", () => {
      this._dispose().catch((e) => (0, import_Debug.debugAndPrintError)(`onDispose error: ${e && e.message || e || "promise rejected"}`)).finally(() => this._events.emit("disconnect"));
    });
    this.setPatchRate(this.patchRate);
    this.resetAutoDisposeTimeout(this.seatReservationTime);
  }
  get locked() {
    return this._locked;
  }
  get metadata() {
    return this.listing.metadata;
  }
  #_roomId;
  #_roomName;
  #_autoDispose;
  get autoDispose() {
    return this.#_autoDispose;
  }
  set autoDispose(value) {
    if (value !== this.#_autoDispose && this._internalState !== 2 /* DISPOSING */) {
      this.#_autoDispose = value;
      this.resetAutoDisposeTimeout();
    }
  }
  get roomName() {
    return this.#_roomName;
  }
  set roomName(roomName) {
    if (this.#_roomName) {
      throw new import_ServerError.ServerError(import_Protocol.ErrorCode.APPLICATION_ERROR, "'roomName' cannot be overwritten.");
    }
    this.#_roomName = roomName;
  }
  get roomId() {
    return this.#_roomId;
  }
  set roomId(roomId) {
    if (this._internalState !== 0 /* CREATING */ && !import_DevMode.isDevMode) {
      throw new import_ServerError.ServerError(import_Protocol.ErrorCode.APPLICATION_ERROR, "'roomId' can only be overridden upon room creation.");
    }
    this.#_roomId = roomId;
  }
  onAuth(client, options, request) {
    return true;
  }
  static async onAuth(token, req) {
    return true;
  }
  hasReachedMaxClients() {
    return this.clients.length + Object.keys(this.reservedSeats).length >= this.maxClients || this._internalState === 2 /* DISPOSING */;
  }
  setSeatReservationTime(seconds) {
    this.seatReservationTime = seconds;
    return this;
  }
  hasReservedSeat(sessionId, reconnectionToken) {
    const reservedSeat = this.reservedSeats[sessionId];
    if (reservedSeat === void 0) {
      return false;
    }
    if (reservedSeat[3]) {
      return reconnectionToken && this._reconnections[reconnectionToken]?.[0] === sessionId && this._reconnectingSessionId.has(sessionId);
    } else {
      return reservedSeat[2] === false;
    }
  }
  checkReconnectionToken(reconnectionToken) {
    const sessionId = this._reconnections[reconnectionToken]?.[0];
    const reservedSeat = this.reservedSeats[sessionId];
    if (reservedSeat && reservedSeat[3]) {
      this._reconnectingSessionId.set(sessionId, reconnectionToken);
      return sessionId;
    } else {
      return void 0;
    }
  }
  setSimulationInterval(onTickCallback, delay = DEFAULT_SIMULATION_INTERVAL) {
    if (this._simulationInterval) {
      clearInterval(this._simulationInterval);
    }
    if (onTickCallback) {
      this._simulationInterval = setInterval(() => {
        this.clock.tick();
        onTickCallback(this.clock.deltaTime);
      }, delay);
    }
  }
  setPatchRate(milliseconds) {
    this.patchRate = milliseconds;
    if (this._patchInterval) {
      clearInterval(this._patchInterval);
      this._patchInterval = void 0;
    }
    if (milliseconds !== null && milliseconds !== 0) {
      this._patchInterval = setInterval(() => this.broadcastPatch(), milliseconds);
    }
  }
  setState(newState) {
    this.clock.start();
    if ("_definition" in newState) {
      this.setSerializer(new import_SchemaSerializer.SchemaSerializer());
    }
    this._serializer.reset(newState);
    this.state = newState;
  }
  setSerializer(serializer) {
    this._serializer = serializer;
  }
  async setMetadata(meta) {
    if (!this.listing.metadata) {
      this.listing.metadata = meta;
    } else {
      for (const field in meta) {
        if (!meta.hasOwnProperty(field)) {
          continue;
        }
        this.listing.metadata[field] = meta[field];
      }
      if ("markModified" in this.listing) {
        this.listing.markModified("metadata");
      }
    }
    if (this._internalState === 1 /* CREATED */) {
      await this.listing.save();
    }
  }
  async setPrivate(bool = true) {
    if (this.listing.private === bool)
      return;
    this.listing.private = bool;
    if (this._internalState === 1 /* CREATED */) {
      await this.listing.save();
    }
    this._events.emit("visibility-change", bool);
  }
  async lock() {
    this._lockedExplicitly = arguments[0] === void 0;
    if (this._locked) {
      return;
    }
    this._locked = true;
    await this.listing.updateOne({
      $set: { locked: this._locked }
    });
    this._events.emit("lock");
  }
  async unlock() {
    if (arguments[0] === void 0) {
      this._lockedExplicitly = false;
    }
    if (!this._locked) {
      return;
    }
    this._locked = false;
    await this.listing.updateOne({
      $set: { locked: this._locked }
    });
    this._events.emit("unlock");
  }
  send(client, messageOrType, messageOrOptions, options) {
    import_Logger.logger.warn("DEPRECATION WARNING: use client.send(...) instead of this.send(client, ...)");
    client.send(messageOrType, messageOrOptions, options);
  }
  broadcast(typeOrSchema, messageOrOptions, options) {
    const isSchema = typeof typeOrSchema === "object";
    const opts = isSchema ? messageOrOptions : options;
    if (opts && opts.afterNextPatch) {
      delete opts.afterNextPatch;
      this._afterNextPatchQueue.push(["broadcast", arguments]);
      return;
    }
    if (isSchema) {
      this.broadcastMessageSchema(typeOrSchema, opts);
    } else {
      this.broadcastMessageType(typeOrSchema, messageOrOptions, opts);
    }
  }
  broadcastPatch() {
    if (this.onBeforePatch) {
      this.onBeforePatch(this.state);
    }
    if (!this._simulationInterval) {
      this.clock.tick();
    }
    if (!this.state) {
      return false;
    }
    const hasChanges = this._serializer.applyPatches(this.clients, this.state);
    this._dequeueAfterPatchMessages();
    return hasChanges;
  }
  onMessage(messageType, callback) {
    this.onMessageHandlers[messageType] = callback;
    return () => delete this.onMessageHandlers[messageType];
  }
  disconnect(closeCode = import_Protocol.Protocol.WS_CLOSE_CONSENTED) {
    if (this._internalState === 2 /* DISPOSING */) {
      return Promise.resolve(`disconnect() ignored: room (${this.roomId}) is already disposing.`);
    } else if (this._internalState === 0 /* CREATING */) {
      throw new Error("cannot disconnect during onCreate()");
    }
    this._internalState = 2 /* DISPOSING */;
    this.listing.remove();
    this.#_autoDispose = true;
    const delayedDisconnection = new Promise((resolve) => this._events.once("disconnect", () => resolve()));
    for (const [_, reconnection] of Object.values(this._reconnections)) {
      reconnection.reject();
    }
    let numClients = this.clients.length;
    if (numClients > 0) {
      while (numClients--) {
        this._forciblyCloseClient(this.clients[numClients], closeCode);
      }
    } else {
      this._events.emit("dispose");
    }
    return delayedDisconnection;
  }
  async ["_onJoin"](client, req) {
    const sessionId = client.sessionId;
    client._reconnectionToken = (0, import_Utils.generateId)();
    if (this.reservedSeatTimeouts[sessionId]) {
      clearTimeout(this.reservedSeatTimeouts[sessionId]);
      delete this.reservedSeatTimeouts[sessionId];
    }
    if (this._autoDisposeTimeout) {
      clearTimeout(this._autoDisposeTimeout);
      this._autoDisposeTimeout = void 0;
    }
    const [joinOptions, authData, isConsumed, isWaitingReconnection] = this.reservedSeats[sessionId];
    if (isConsumed) {
      throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_EXPIRED, "already consumed");
    }
    this.reservedSeats[sessionId][2] = true;
    client._afterNextPatchQueue = this._afterNextPatchQueue;
    client.ref["onleave"] = (_) => client.state = import_Transport.ClientState.LEAVING;
    client.ref.once("close", client.ref["onleave"]);
    if (isWaitingReconnection) {
      const previousReconnectionToken = this._reconnectingSessionId.get(sessionId);
      if (previousReconnectionToken) {
        this.clients.push(client);
        this._reconnections[previousReconnectionToken]?.[1].resolve(client);
      } else {
        const errorMessage = process.env.NODE_ENV === "production" ? "already consumed" : "bad reconnection token";
        throw new import_ServerError.ServerError(import_Protocol.ErrorCode.MATCHMAKE_EXPIRED, errorMessage);
      }
    } else {
      try {
        if (authData) {
          client.auth = authData;
        } else if (this.onAuth !== Room.prototype.onAuth) {
          client.auth = await this.onAuth(client, joinOptions, req);
          if (!client.auth) {
            throw new import_ServerError.ServerError(import_Protocol.ErrorCode.AUTH_FAILED, "onAuth failed");
          }
        }
        if (client.readyState !== import_ws.default.OPEN) {
          throw new import_ServerError.ServerError(import_Protocol.Protocol.WS_CLOSE_GOING_AWAY, "already disconnected");
        }
        this.clients.push(client);
        Object.defineProperty(this.reservedSeats, sessionId, {
          value: this.reservedSeats[sessionId],
          enumerable: false
        });
        if (this.onJoin) {
          await this.onJoin(client, joinOptions, client.auth);
        }
        this._events.emit("join", client);
        delete this.reservedSeats[sessionId];
        if (client.state === import_Transport.ClientState.LEAVING) {
          await this._onLeave(client, import_Protocol.Protocol.WS_CLOSE_GOING_AWAY);
        }
      } catch (e) {
        this.clients.delete(client);
        delete this.reservedSeats[sessionId];
        this._decrementClientCount();
        if (!e.code) {
          e.code = import_Protocol.ErrorCode.APPLICATION_ERROR;
        }
        throw e;
      }
    }
    if (client.state === import_Transport.ClientState.JOINING) {
      client.ref.removeListener("close", client.ref["onleave"]);
      client.ref["onleave"] = this._onLeave.bind(this, client);
      client.ref.once("close", client.ref["onleave"]);
      client.ref.on("message", this._onMessage.bind(this, client));
      client.raw(import_Protocol.getMessageBytes[import_Protocol.Protocol.JOIN_ROOM](
        client._reconnectionToken,
        this._serializer.id,
        this._serializer.handshake && this._serializer.handshake()
      ));
    }
  }
  allowReconnection(previousClient, seconds) {
    if (previousClient._enqueuedMessages !== void 0) {
      return;
    }
    if (seconds === void 0) {
      console.warn('DEPRECATED: allowReconnection() requires a second argument. Using "manual" mode.');
      seconds = "manual";
    }
    if (seconds === "manual") {
      seconds = Infinity;
    }
    if (this._internalState === 2 /* DISPOSING */) {
      this._disposeIfEmpty();
      throw new Error("disconnecting");
    }
    const sessionId = previousClient.sessionId;
    const reconnectionToken = previousClient._reconnectionToken;
    this._reserveSeat(sessionId, true, previousClient.auth, seconds, true);
    const reconnection = new import_Utils.Deferred();
    this._reconnections[reconnectionToken] = [sessionId, reconnection];
    if (seconds !== Infinity) {
      this.reservedSeatTimeouts[sessionId] = setTimeout(() => reconnection.reject(false), seconds * 1e3);
    }
    const cleanup = () => {
      delete this._reconnections[reconnectionToken];
      delete this.reservedSeats[sessionId];
      delete this.reservedSeatTimeouts[sessionId];
      this._reconnectingSessionId.delete(sessionId);
    };
    reconnection.then((newClient) => {
      newClient.auth = previousClient.auth;
      newClient.userData = previousClient.userData;
      previousClient.ref = newClient.ref;
      previousClient.state = import_Transport.ClientState.RECONNECTED;
      clearTimeout(this.reservedSeatTimeouts[sessionId]);
      cleanup();
    }).catch(() => {
      cleanup();
      this.resetAutoDisposeTimeout();
    });
    return reconnection;
  }
  resetAutoDisposeTimeout(timeoutInSeconds = 1) {
    clearTimeout(this._autoDisposeTimeout);
    if (!this.#_autoDispose) {
      return;
    }
    this._autoDisposeTimeout = setTimeout(() => {
      this._autoDisposeTimeout = void 0;
      this._disposeIfEmpty();
    }, timeoutInSeconds * 1e3);
  }
  broadcastMessageSchema(message, options = {}) {
    (0, import_Debug.debugMessage)("broadcast: %O", message);
    const encodedMessage = import_Protocol.getMessageBytes[import_Protocol.Protocol.ROOM_DATA_SCHEMA](message);
    const except = typeof options.except !== "undefined" ? Array.isArray(options.except) ? options.except : [options.except] : void 0;
    let numClients = this.clients.length;
    while (numClients--) {
      const client = this.clients[numClients];
      if (!except || !except.includes(client)) {
        client.enqueueRaw(encodedMessage);
      }
    }
  }
  broadcastMessageType(type, message, options = {}) {
    (0, import_Debug.debugMessage)("broadcast: %O", message);
    const encodedMessage = import_Protocol.getMessageBytes.raw(import_Protocol.Protocol.ROOM_DATA, type, message);
    const except = typeof options.except !== "undefined" ? Array.isArray(options.except) ? options.except : [options.except] : void 0;
    let numClients = this.clients.length;
    while (numClients--) {
      const client = this.clients[numClients];
      if (!except || !except.includes(client)) {
        client.enqueueRaw(encodedMessage);
      }
    }
  }
  sendFullState(client) {
    client.enqueueRaw(import_Protocol.getMessageBytes[import_Protocol.Protocol.ROOM_STATE](this._serializer.getFullState(client)));
  }
  _dequeueAfterPatchMessages() {
    const length = this._afterNextPatchQueue.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        const [target, args] = this._afterNextPatchQueue[i];
        if (target === "broadcast") {
          this.broadcast.apply(this, args);
        } else {
          target.raw.apply(target, args);
        }
      }
      this._afterNextPatchQueue.splice(0, length);
    }
  }
  async _reserveSeat(sessionId, joinOptions = true, authData = void 0, seconds = this.seatReservationTime, allowReconnection = false, devModeReconnection) {
    if (!allowReconnection && this.hasReachedMaxClients()) {
      return false;
    }
    this.reservedSeats[sessionId] = [joinOptions, authData, false, allowReconnection];
    if (!allowReconnection) {
      await this._incrementClientCount();
      this.reservedSeatTimeouts[sessionId] = setTimeout(async () => {
        delete this.reservedSeats[sessionId];
        delete this.reservedSeatTimeouts[sessionId];
        await this._decrementClientCount();
      }, seconds * 1e3);
      this.resetAutoDisposeTimeout(seconds);
    }
    if (devModeReconnection) {
      this._reconnectingSessionId.set(sessionId, sessionId);
    }
    return true;
  }
  _disposeIfEmpty() {
    const willDispose = this.#_autoDispose && this._autoDisposeTimeout === void 0 && this.clients.length === 0 && Object.keys(this.reservedSeats).length === 0;
    if (willDispose) {
      this._events.emit("dispose");
    }
    return willDispose;
  }
  async _dispose() {
    this._internalState = 2 /* DISPOSING */;
    this.listing.remove();
    let userReturnData;
    if (this.onDispose) {
      userReturnData = this.onDispose();
    }
    if (this._patchInterval) {
      clearInterval(this._patchInterval);
      this._patchInterval = void 0;
    }
    if (this._simulationInterval) {
      clearInterval(this._simulationInterval);
      this._simulationInterval = void 0;
    }
    if (this._autoDisposeTimeout) {
      clearInterval(this._autoDisposeTimeout);
      this._autoDisposeTimeout = void 0;
    }
    this.clock.clear();
    this.clock.stop();
    return await (userReturnData || Promise.resolve());
  }
  _onMessage(client, bytes) {
    if (client.state === import_Transport.ClientState.LEAVING) {
      return;
    }
    const it = { offset: 0 };
    const code = import_schema.decode.uint8(bytes, it);
    if (!bytes) {
      (0, import_Debug.debugAndPrintError)(`${this.roomName} (${this.roomId}), couldn't decode message: ${bytes}`);
      return;
    }
    if (code === import_Protocol.Protocol.ROOM_DATA) {
      const messageType = import_schema.decode.stringCheck(bytes, it) ? import_schema.decode.string(bytes, it) : import_schema.decode.number(bytes, it);
      let message;
      try {
        message = bytes.length > it.offset ? (0, import_msgpackr.unpack)(new Uint8Array(bytes.slice(it.offset, bytes.length))) : void 0;
        (0, import_Debug.debugMessage)("received: '%s' -> %j", messageType, message);
      } catch (e) {
        (0, import_Debug.debugAndPrintError)(e);
        client.leave(import_Protocol.Protocol.WS_CLOSE_WITH_ERROR);
        return;
      }
      if (this.onMessageHandlers[messageType]) {
        this.onMessageHandlers[messageType](client, message);
      } else if (this.onMessageHandlers["*"]) {
        this.onMessageHandlers["*"](client, messageType, message);
      } else {
        const errorMessage = `onMessage for "${messageType}" not registered.`;
        (0, import_Debug.debugAndPrintError)(errorMessage);
        if (import_DevMode.isDevMode) {
          client.error(import_Protocol.ErrorCode.INVALID_PAYLOAD, errorMessage);
        } else {
          client.leave(import_Protocol.Protocol.WS_CLOSE_WITH_ERROR, errorMessage);
        }
      }
    } else if (code === import_Protocol.Protocol.ROOM_DATA_BYTES) {
      const messageType = import_schema.decode.stringCheck(bytes, it) ? import_schema.decode.string(bytes, it) : import_schema.decode.number(bytes, it);
      const message = bytes.slice(it.offset, bytes.length);
      (0, import_Debug.debugMessage)("received: '%s' -> %j", messageType, message);
      if (this.onMessageHandlers[messageType]) {
        this.onMessageHandlers[messageType](client, message);
      } else if (this.onMessageHandlers["*"]) {
        this.onMessageHandlers["*"](client, messageType, message);
      } else {
        const errorMessage = `onMessage for "${messageType}" not registered.`;
        (0, import_Debug.debugAndPrintError)(errorMessage);
        if (import_DevMode.isDevMode) {
          client.error(import_Protocol.ErrorCode.INVALID_PAYLOAD, errorMessage);
        } else {
          client.leave(import_Protocol.Protocol.WS_CLOSE_WITH_ERROR, errorMessage);
        }
      }
    } else if (code === import_Protocol.Protocol.JOIN_ROOM && client.state === import_Transport.ClientState.JOINING) {
      client.state = import_Transport.ClientState.JOINED;
      if (this.state) {
        this.sendFullState(client);
      }
      if (client._enqueuedMessages.length > 0) {
        client._enqueuedMessages.forEach((enqueued) => client.raw(enqueued));
      }
      delete client._enqueuedMessages;
    } else if (code === import_Protocol.Protocol.LEAVE_ROOM) {
      this._forciblyCloseClient(client, import_Protocol.Protocol.WS_CLOSE_CONSENTED);
    }
  }
  _forciblyCloseClient(client, closeCode) {
    client.ref.removeAllListeners("message");
    client.ref.removeListener("close", client.ref["onleave"]);
    this._onLeave(client, closeCode).then(() => client.leave(closeCode));
  }
  async _onLeave(client, code) {
    const success = this.clients.delete(client);
    if (success) {
      client.state = import_Transport.ClientState.LEAVING;
      if (this.onLeave) {
        try {
          await this.onLeave(client, code === import_Protocol.Protocol.WS_CLOSE_CONSENTED);
        } catch (e) {
          (0, import_Debug.debugAndPrintError)(`onLeave error: ${e && e.message || e || "promise rejected"}`);
        }
      }
    }
    if (this._reconnections[client._reconnectionToken]) {
      this._reconnections[client._reconnectionToken][1].catch(async () => {
        const willDispose = await this._decrementClientCount();
        if (this.reservedSeats[client.sessionId] === void 0) {
          this._events.emit("leave", client, willDispose);
        }
      });
    } else if (client.state !== import_Transport.ClientState.RECONNECTED) {
      const willDispose = await this._decrementClientCount();
      if (this.reservedSeats[client.sessionId] === void 0) {
        this._events.emit("leave", client, willDispose);
      }
    }
  }
  async _incrementClientCount() {
    if (!this._locked && this.hasReachedMaxClients()) {
      this._maxClientsReached = true;
      this.lock.call(this, true);
    }
    await this.listing.updateOne({
      $inc: { clients: 1 },
      $set: { locked: this._locked }
    });
  }
  async _decrementClientCount() {
    const willDispose = this._disposeIfEmpty();
    if (this._internalState === 2 /* DISPOSING */) {
      return true;
    }
    if (!willDispose) {
      if (this._maxClientsReached && !this._lockedExplicitly) {
        this._maxClientsReached = false;
        this.unlock.call(this, true);
      }
      await this.listing.updateOne({
        $inc: { clients: -1 },
        $set: { locked: this._locked }
      });
    }
    return willDispose;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_SEAT_RESERVATION_TIME,
  Room,
  RoomInternalState
});
