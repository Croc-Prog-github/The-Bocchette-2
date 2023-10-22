import "./Room.ext";
import { Server } from "@colyseus/core";
import { listen } from "@colyseus/tools";
import { ColyseusTestServer } from "./TestServer";
const DEFAULT_TEST_PORT = 2568;
async function boot(config, port = DEFAULT_TEST_PORT) {
  if (config instanceof Server) {
    const gameServer = config;
    await gameServer.listen(DEFAULT_TEST_PORT);
    return new ColyseusTestServer(gameServer);
  } else {
    if (!config.options) {
      config.options = {};
    }
    config.options.greet = false;
    config.options.gracefullyShutdown = false;
    const gameServer = await listen({ ...config, displayLogs: false }, port);
    return new ColyseusTestServer(gameServer);
  }
}
export {
  ColyseusTestServer,
  boot
};
