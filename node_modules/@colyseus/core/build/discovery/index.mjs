import ip from 'internal-ip';

const NODES_SET = 'colyseus:nodes';
const DISCOVERY_CHANNEL = 'colyseus:nodes:discovery';
async function getNodeAddress(node) {
    const host = process.env.SELF_HOSTNAME || await ip.v4();
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

export { registerNode, unregisterNode };
//# sourceMappingURL=index.mjs.map
