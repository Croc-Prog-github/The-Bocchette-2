import "./Room.ext";
import { Server } from "@colyseus/core";
import { ConfigOptions } from "@colyseus/tools";
import { ColyseusTestServer } from "./TestServer";
export declare function boot(config: ConfigOptions | Server, port?: number): Promise<ColyseusTestServer>;
export { ColyseusTestServer };
