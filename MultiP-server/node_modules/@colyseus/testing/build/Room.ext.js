var import_core = require("@colyseus/core");
var import_colyseus = require("colyseus.js");
const _originalOnMessage = import_core.Room.prototype["_onMessage"];
import_core.Room.prototype["_onMessage"] = function() {
  _originalOnMessage.apply(this, arguments);
  if (this._waitingForMessage) {
    setTimeout(() => this._waitingForMessage[1].resolve(), this._waitingForMessage[0]);
  }
};
import_core.Room.prototype.waitForNextMessage = async function(additionalDelay = 0) {
  this._waitingForMessage = [additionalDelay, new import_core.Deferred()];
  return this._waitingForMessage[1];
};
import_core.Room.prototype.waitForMessage = async function(type, rejectTimeout = 3e3) {
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
import_core.Room.prototype.waitForNextSimulationTick = async function() {
  if (this["_simulationInterval"]) {
    const milliseconds = this["_simulationInterval"]["_idleTimeout"];
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  } else {
    console.warn("\u26A0\uFE0F waitForSimulation() - .setSimulationInterval() is a must.");
    return Promise.resolve();
  }
};
const _originalBroadcastPatch = import_core.Room.prototype["broadcastPatch"];
import_core.Room.prototype["broadcastPatch"] = function() {
  const retVal = _originalBroadcastPatch.apply(this, arguments);
  if (this._waitingForPatch) {
    setTimeout(() => this._waitingForPatch[1].resolve(), this._waitingForPatch[0]);
  }
  return retVal;
};
import_core.Room.prototype.waitForNextPatch = async function(additionalDelay = 0) {
  this._waitingForPatch = [additionalDelay, new import_core.Deferred()];
  return this._waitingForPatch[1];
};
import_colyseus.Room.prototype.waitForMessage = async function(type, rejectTimeout = 3e3) {
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
const _originalClientOnMessage = import_colyseus.Room.prototype["dispatchMessage"];
import_colyseus.Room.prototype["dispatchMessage"] = function() {
  _originalClientOnMessage.apply(this, arguments);
  if (this._waitingForMessage) {
    setTimeout(() => {
      this._waitingForMessage[1].resolve([arguments[0], arguments[1]]);
    }, this._waitingForMessage[0]);
  }
};
import_colyseus.Room.prototype.waitForNextMessage = async function(additionalDelay = 0) {
  this._waitingForMessage = [additionalDelay, new import_core.Deferred()];
  return this._waitingForMessage[1];
};
const _originalClientPatch = import_colyseus.Room.prototype["patch"];
import_colyseus.Room.prototype["patch"] = function() {
  _originalClientPatch.apply(this, arguments);
  if (this._waitingForPatch) {
    setTimeout(() => {
      this._waitingForPatch[1].resolve([arguments[0], arguments[1]]);
    }, this._waitingForPatch[0]);
  }
};
import_colyseus.Room.prototype.waitForNextPatch = async function(additionalDelay = 0) {
  this._waitingForPatch = [additionalDelay, new import_core.Deferred()];
  return this._waitingForPatch[1];
};
