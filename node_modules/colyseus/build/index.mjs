import { Server } from '@colyseus/core';
export * from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
export { RedisPresence } from '@colyseus/redis-presence';
export { MongooseDriver } from '@colyseus/mongoose-driver';

Server.prototype['getDefaultTransport'] = function (options) {
    return new WebSocketTransport(options);
};
//# sourceMappingURL=index.mjs.map
