'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var schema = require('@colyseus/schema');
var Debug = require('../Debug.js');
var Protocol = require('../Protocol.js');
var Transport = require('../Transport.js');

/* tslint:disable:no-string-literal */
class SchemaSerializer {
    id = 'schema';
    state;
    useFilters = false;
    handshakeCache;
    reset(newState) {
        this.state = newState;
        this.useFilters = schema.hasFilter(newState.constructor);
    }
    getFullState(client) {
        const fullEncodedState = this.state.encodeAll(this.useFilters);
        if (client && this.useFilters) {
            return this.state.applyFilters(client, true);
        }
        else {
            return fullEncodedState;
        }
    }
    applyPatches(clients) {
        const hasChanges = this.state['$changes'].changes.size > 0;
        if (hasChanges) {
            let numClients = clients.length;
            // dump changes for patch debugging
            if (Debug.debugPatch.enabled) {
                Debug.debugPatch.dumpChanges = schema.dumpChanges(this.state);
            }
            // get patch bytes
            const patches = this.state.encode(false, [], this.useFilters);
            if (!this.useFilters) {
                // encode changes once, for all clients
                patches.unshift(Protocol.Protocol.ROOM_STATE_PATCH);
                while (numClients--) {
                    const client = clients[numClients];
                    //
                    // FIXME: avoid this check.
                    //
                    if (client.state === Transport.ClientState.JOINED) {
                        client.raw(patches);
                    }
                }
            }
            else {
                // encode state multiple times, for each client
                while (numClients--) {
                    const client = clients[numClients];
                    //
                    // FIXME: avoid this check.
                    //
                    if (client.state === Transport.ClientState.JOINED) {
                        const filteredPatches = this.state.applyFilters(client);
                        client.raw([Protocol.Protocol.ROOM_STATE_PATCH, ...filteredPatches]);
                    }
                }
                this.state.discardAllChanges();
            }
            // debug patches
            if (Debug.debugPatch.enabled) {
                Debug.debugPatch('%d bytes sent to %d clients, %j', patches.length, clients.length, Debug.debugPatch.dumpChanges);
            }
        }
        return hasChanges;
    }
    handshake() {
        /**
         * Cache handshake to avoid encoding it for each client joining
         */
        if (!this.handshakeCache) {
            this.handshakeCache = (this.state && schema.Reflection.encode(this.state));
        }
        return this.handshakeCache;
    }
}

exports.SchemaSerializer = SchemaSerializer;
//# sourceMappingURL=SchemaSerializer.js.map
