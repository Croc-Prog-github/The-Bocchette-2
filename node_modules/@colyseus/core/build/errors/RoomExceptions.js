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
var RoomExceptions_exports = {};
__export(RoomExceptions_exports, {
  OnAuthException: () => OnAuthException,
  OnCreateException: () => OnCreateException,
  OnDisposeException: () => OnDisposeException,
  OnJoinException: () => OnJoinException,
  OnLeaveException: () => OnLeaveException,
  OnMessageException: () => OnMessageException,
  SimulationIntervalException: () => SimulationIntervalException,
  TimedEventException: () => TimedEventException
});
module.exports = __toCommonJS(RoomExceptions_exports);
class OnCreateException extends Error {
  constructor(cause, message, options) {
    super(message, { cause });
    this.options = options;
    this.name = "OnCreateException";
  }
}
class OnAuthException extends Error {
  constructor(cause, message, client, options) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.name = "OnAuthException";
  }
}
class OnJoinException extends Error {
  constructor(cause, message, client, options, auth) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.auth = auth;
    this.name = "OnJoinException";
  }
}
class OnLeaveException extends Error {
  constructor(cause, message, client, consented) {
    super(message, { cause });
    this.client = client;
    this.consented = consented;
    this.name = "OnLeaveException";
  }
}
class OnDisposeException extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "OnDisposeException";
  }
}
class OnMessageException extends Error {
  constructor(cause, message, client, payload, type) {
    super(message, { cause });
    this.client = client;
    this.payload = payload;
    this.type = type;
    this.name = "OnMessageException";
  }
}
class SimulationIntervalException extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "SimulationIntervalException";
  }
}
class TimedEventException extends Error {
  constructor(cause, message, ...args) {
    super(message, { cause });
    this.name = "TimedEventException";
    this.args = args;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OnAuthException,
  OnCreateException,
  OnDisposeException,
  OnJoinException,
  OnLeaveException,
  OnMessageException,
  SimulationIntervalException,
  TimedEventException
});
