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
var src_exports = {};
__export(src_exports, {
  ColyseusTestServer: () => import_TestServer.ColyseusTestServer,
  boot: () => boot
});
module.exports = __toCommonJS(src_exports);
var import_Room = require("./Room.ext");
var import_core = require("@colyseus/core");
var import_tools = require("@colyseus/tools");
var import_TestServer = require("./TestServer");
const DEFAULT_TEST_PORT = 2568;
async function boot(config, port = DEFAULT_TEST_PORT) {
  if (config instanceof import_core.Server) {
    const gameServer = config;
    await gameServer.listen(DEFAULT_TEST_PORT);
    return new import_TestServer.ColyseusTestServer(gameServer);
  } else {
    if (!config.options) {
      config.options = {};
    }
    config.options.greet = false;
    config.options.gracefullyShutdown = false;
    const gameServer = await (0, import_tools.listen)({ ...config, displayLogs: false }, port);
    return new import_TestServer.ColyseusTestServer(gameServer);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColyseusTestServer,
  boot
});
