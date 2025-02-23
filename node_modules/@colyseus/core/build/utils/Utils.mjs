// packages/core/src/utils/Utils.ts
import nanoid from "nanoid";
import { EventEmitter } from "events";
import { debugAndPrintError } from "../Debug.mjs";
var REMOTE_ROOM_SHORT_TIMEOUT = Number(process.env.COLYSEUS_PRESENCE_SHORT_TIMEOUT || 2e3);
var MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME = Number(process.env.COLYSEUS_MAX_CONCURRENT_CREATE_ROOM_WAIT_TIME || 0.5);
function generateId(length = 9) {
  return nanoid(length);
}
function getBearerToken(authHeader) {
  return authHeader && authHeader.startsWith("Bearer ") && authHeader.substring(7, authHeader.length) || void 0;
}
var signals = ["SIGINT", "SIGTERM", "SIGUSR2"];
function registerGracefulShutdown(callback) {
  process.on("uncaughtException", (err) => {
    debugAndPrintError(err);
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
var Deferred = class _Deferred {
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
    return new _Deferred(Promise.reject(reason));
  }
  static resolve(value) {
    return new _Deferred(Promise.resolve(value));
  }
};
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
var HttpServerMock = class extends EventEmitter {
};
export {
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
};
