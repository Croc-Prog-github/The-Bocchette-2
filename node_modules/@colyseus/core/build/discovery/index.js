'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ip = require('internal-ip');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ip__default = /*#__PURE__*/_interopDefaultLegacy(ip);

const NODES_SET = 'colyseus:nodes';
const DISCOVERY_CHANNEL = 'colyseus:nodes:discovery';
async function getNodeAddress(node) {
    const host = process.env.SELF_HOSTNAME || await ip__default['default'].v4();
    const port = process.env.SELF_PORT || node.port;
    return `${node.processId}/${host}:${port}`;
}
async function registerNode(presence, node) {
    const nodeAddress = await getNodeAddress(node);
    await presence.sadd(NODES_SET, nodeAddress);
    await presence.publish(DISCOVERY_CHANNEL, `add,${nodeAddress}`);
}
async function unregisterNode(presence, node) {
    const nodeAddress = await getNodeAddress(node);
    await presence.srem(NODES_SET, nodeAddress);
    await presence.publish(DISCOVERY_CHANNEL, `remove,${nodeAddress}`);
}

exports.registerNode = registerNode;
exports.unregisterNode = unregisterNode;
//# sourceMappingURL=index.js.map
