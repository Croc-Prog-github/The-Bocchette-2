'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@colyseus/core');
var wsTransport = require('@colyseus/ws-transport');
var redisPresence = require('@colyseus/redis-presence');
var mongooseDriver = require('@colyseus/mongoose-driver');

core.Server.prototype['getDefaultTransport'] = function (options) {
    return new wsTransport.WebSocketTransport(options);
};

Object.defineProperty(exports, 'RedisPresence', {
    enumerable: true,
    get: function () {
        return redisPresence.RedisPresence;
    }
});
Object.defineProperty(exports, 'MongooseDriver', {
    enumerable: true,
    get: function () {
        return mongooseDriver.MongooseDriver;
    }
});
Object.keys(core).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return core[k];
        }
    });
});
//# sourceMappingURL=index.js.map
