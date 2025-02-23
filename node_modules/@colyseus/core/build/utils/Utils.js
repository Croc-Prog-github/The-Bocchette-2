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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Utils_exports = {};
__export(Utils_exports, {
  Deferred: () => Deferred,
  HttpServerMock: () => HttpServerMock,
  MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME: () => MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME,
  REMOTE_ROOM_SHORT_TIMEOUT: () => REMOTE_ROOM_SHORT_TIMEOUT,
  generateId: () => generateId,
  getBearerToken: () => getBearerToken,
  merge: () => merge,
  registerGracefulShutdown: () => registerGracefulShutdown,
  retry: () => retry,
  spliceOne: () => spliceOne,
  wrapTryCatch: () => wrapTryCatch
});
module.exports = __toCommonJS(Utils_exports);
var import_nanoid = __toESM(require("nanoid"));
var import_events = require("events");
var import_Debug = require("../Debug.js");
const REMOTE_ROOM_SHORT_TIMEOUT = Number(process.env.COLYSEUS_PRESENCE_SHORT_TIMEOUT || 2e3);
const MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME = Number(process.env.COLYSEUS_MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME || 0.5);
function generateId(length = 9) {
  return (0, import_nanoid.default)(length);
}
function getBearerToken(authHeader) {
  return authHeader && authHeader.startsWith("Bearer ") && authHeader.substring(7, authHeader.length) || void 0;
}
const signals = ["SIGINT", "SIGTERM", "SIGUSR2"];
function registerGracefulShutdown(callback) {
  process.on("uncaughtException", (err) => {
    (0, import_Debug.debugAndPrintError)(err);
    callback(err);
  });
  signals.forEach((signal) => process.once(signal, () => callback()));
}
function retry(cb, maxRetries = 3, errorWhiteList = [], retries = 0) {
  return new Promise((resolve, reject) => {
    cb().then(resolve).catch((e) => {
      if (errorWhiteList.indexOf(e.constructor) !== -1 && retries++ < maxRetries) {
        setTimeout(() => {
          retry(cb, maxRetries, errorWhiteList, retries).then(resolve).catch((e2) => reject(e2));
        }, Math.floor(Math.random() * Math.pow(2, retries) * 400));
      } else {
        reject(e);
      }
    });
  });
}
function spliceOne(arr, index) {
  if (index === -1 || index >= arr.length) {
    return false;
  }
  const len = arr.length - 1;
  for (let i = index; i < len; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length = len;
  return true;
}
class Deferred {
  constructor(promise) {
    this.promise = promise ?? new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  then(func) {
    return this.promise.then.apply(this.promise, arguments);
  }
  catch(func) {
    return this.promise.catch(func);
  }
  static reject(reason) {
    return new Deferred(Promise.reject(reason));
  }
  static resolve(value) {
    return new Deferred(Promise.resolve(value));
  }
}
function merge(a, ...objs) {
  for (let i = 0, len = objs.length; i < len; i++) {
    const b = objs[i];
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
  }
  return a;
}
function wrapTryCatch(method, onError, exceptionClass, methodName, rethrow = false, ...additionalErrorArgs) {
  return (...args) => {
    try {
      const result = method(...args);
      if (typeof result?.catch === "function") {
        return result.catch((e) => {
          onError(new exceptionClass(e, e.message, ...args, ...additionalErrorArgs), methodName);
          if (rethrow) {
            throw e;
          }
        });
      }
      return result;
    } catch (e) {
      onError(new exceptionClass(e, e.message, ...args, ...additionalErrorArgs), methodName);
      if (rethrow) {
        throw e;
      }
    }
  };
}
class HttpServerMock extends import_events.EventEmitter {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Deferred,
  HttpServerMock,
  MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME,
  REMOTE_ROOM_SHORT_TIMEOUT,
  generateId,
  getBearerToken,
  merge,
  registerGracefulShutdown,
  retry,
  spliceOne,
  wrapTryCatch
});
