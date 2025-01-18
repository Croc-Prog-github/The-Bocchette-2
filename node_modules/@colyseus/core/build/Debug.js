'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var debug = require('debug');
var ServerError = require('./errors/ServerError.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);

const debugMatchMaking = debug__default['default']('colyseus:matchmaking');
const debugPatch = debug__default['default']('colyseus:patch');
const debugError = debug__default['default']('colyseus:errors');
const debugConnection = debug__default['default']('colyseus:connection');
const debugDriver = debug__default['default']('colyseus:driver');
const debugPresence = debug__default['default']('colyseus:presence');
const debugAndPrintError = (e) => {
    const message = (e instanceof Error) ? e.stack : e;
    if (!(e instanceof ServerError.ServerError)) {
        console.error(message);
    }
    debugError.call(debugError, message);
};

exports.debugAndPrintError = debugAndPrintError;
exports.debugConnection = debugConnection;
exports.debugDriver = debugDriver;
exports.debugError = debugError;
exports.debugMatchMaking = debugMatchMaking;
exports.debugPatch = debugPatch;
exports.debugPresence = debugPresence;
//# sourceMappingURL=Debug.js.map
