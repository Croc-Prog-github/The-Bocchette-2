// packages/core/src/Debug.ts
import debug from "debug";
import { logger } from "./Logger.mjs";
import { ServerError } from "./errors/ServerError.mjs";
var debugConnection = debug("colyseus:connection");
var debugDriver = debug("colyseus:driver");
var debugError = debug("colyseus:errors");
var debugMatchMaking = debug("colyseus:matchmaking");
var debugMessage = debug("colyseus:message");
var debugPatch = debug("colyseus:patch");
var debugPresence = debug("colyseus:presence");
var debugAndPrintError = (e) => {
  const message = e instanceof Error ? e.stack : e;
  if (!(e instanceof ServerError)) {
    logger.error(message);
  }
  debugError.call(debugError, message);
};
export {
  debugAndPrintError,
  debugConnection,
  debugDriver,
  debugError,
  debugMatchMaking,
  debugMessage,
  debugPatch,
  debugPresence
};
