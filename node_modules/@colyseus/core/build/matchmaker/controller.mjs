import { ErrorCode } from "../Protocol";
import { ServerError } from "../errors/ServerError";
import * as matchMaker from "../MatchMaker";
var controller_default = {
  DEFAULT_CORS_HEADERS: {
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "2592000"
  },
  exposedMethods: ["joinOrCreate", "create", "join", "joinById", "reconnect"],
  allowedRoomNameChars: /([a-zA-Z_\-0-9]+)/gi,
  matchmakeRoute: "matchmake",
  getCorsHeaders(req) {
    const origin = req.headers && req.headers["origin"] || req.getHeader && req.getHeader("origin");
    return {
      ["Access-Control-Allow-Origin"]: origin || "*"
    };
  },
  getAvailableRooms(roomName) {
    const conditions = {
      locked: false,
      private: false
    };
    if (roomName) {
      conditions["name"] = roomName;
    }
    return matchMaker.query(conditions);
  },
  async invokeMethod(method, roomName, clientOptions = {}, authOptions) {
    if (this.exposedMethods.indexOf(method) === -1) {
      throw new ServerError(ErrorCode.MATCHMAKE_NO_HANDLER, `invalid method "${method}"`);
    }
    try {
      return await matchMaker[method](roomName, clientOptions, authOptions);
    } catch (e) {
      throw new ServerError(e.code || ErrorCode.MATCHMAKE_UNHANDLED, e.message);
    }
  }
};
export {
  controller_default as default
};
