import { Deferred, Room } from "@colyseus/core";
import { Room as ClientRoom } from "colyseus.js";
const _originalOnMessage = Room.prototype["_onMessage"];
Room.prototype["_onMessage"] = function() {
  _originalOnMessage.apply(this, arguments);
  if (this._waitingForMessage) {
    setTimeout(() => this._waitingForMessage[1].resolve(), this._waitingForMessage[0]);
  }
};
Room.prototype.waitForNextMessage = async function(additionalDelay = 0) {
  this._waitingForMessage = [additionalDelay, new Deferred()];
  return this._waitingForMessage[1];
};
Room.prototype.waitForMessage = async function(type, rejectTimeout = 3e3) {
  const originalMessageHandler = this["onMessageHandlers"][type] || (() => {
  });
  const room = this;
  return new Promise((resolve, reject) => {
    const rejectionTimeout = setTimeout(() => reject(new Error(`message '${type}' was not called. timed out (${rejectTimeout}ms)`)), rejectTimeout);
    room["onMessageHandlers"][type] = async function(client, message) {
      clearTimeout(rejectionTimeout);
      await originalMessageHandler.apply(room, arguments);
      room["onMessageHandlers"][type] = originalMessageHandler;
      resolve([client, message]);
    };
  });
};
Room.prototype.waitForNextSimulationTick = async function() {
  if (this["_simulationInterval"]) {
    const milliseconds = this["_simulationInterval"]["_idleTimeout"];
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  } else {
    console.warn("\u26A0\uFE0F waitForSimulation() - .setSimulationInterval() is a must.");
    return Promise.resolve();
  }
};
const _originalBroadcastPatch = Room.prototype["broadcastPatch"];
Room.prototype["broadcastPatch"] = function() {
  const retVal = _originalBroadcastPatch.apply(this, arguments);
  if (this._waitingForPatch) {
    setTimeout(() => this._waitingForPatch[1].resolve(), this._waitingForPatch[0]);
  }
  return retVal;
};
Room.prototype.waitForNextPatch = async function(additionalDelay = 0) {
  this._waitingForPatch = [additionalDelay, new Deferred()];
  return this._waitingForPatch[1];
};
ClientRoom.prototype.waitForMessage = async function(type, rejectTimeout = 3e3) {
  return new Promise((resolve, reject) => {
    const received = (message) => {
      unbind();
      resolve(message);
      clearTimeout(rejectionTimeout);
    };
    const unbind = this["onMessageHandlers"].on(type, (message) => received(message));
    const rejectionTimeout = setTimeout(() => {
      unbind();
      reject(new Error(`message '${type}' was not called. timed out (${rejectTimeout}ms)`));
    }, rejectTimeout);
  });
};
const _originalClientOnMessage = ClientRoom.prototype["dispatchMessage"];
ClientRoom.prototype["dispatchMessage"] = function() {
  _originalClientOnMessage.apply(this, arguments);
  if (this._waitingForMessage) {
    setTimeout(() => {
      this._waitingForMessage[1].resolve([arguments[0], arguments[1]]);
    }, this._waitingForMessage[0]);
  }
};
ClientRoom.prototype.waitForNextMessage = async function(additionalDelay = 0) {
  this._waitingForMessage = [additionalDelay, new Deferred()];
  return this._waitingForMessage[1];
};
const _originalClientPatch = ClientRoom.prototype["patch"];
ClientRoom.prototype["patch"] = function() {
  _originalClientPatch.apply(this, arguments);
  if (this._waitingForPatch) {
    setTimeout(() => {
      this._waitingForPatch[1].resolve([arguments[0], arguments[1]]);
    }, this._waitingForPatch[0]);
  }
};
ClientRoom.prototype.waitForNextPatch = async function(additionalDelay = 0) {
  this._waitingForPatch = [additionalDelay, new Deferred()];
  return this._waitingForPatch[1];
};
