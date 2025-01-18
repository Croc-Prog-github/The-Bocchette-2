import { hasFilter, dumpChanges, Reflection } from '@colyseus/schema';
import { debugPatch } from '../Debug.mjs';
import { Protocol } from '../Protocol.mjs';
import { ClientState } from '../Transport.mjs';

/* tslint:disable:no-string-literal */
class SchemaSerializer {
    id = 'schema';
    state;
    useFilters = false;
    handshakeCache;
    reset(newState) {
        this.state = newState;
        this.useFilters = hasFilter(newState.constructor);
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
            if (debugPatch.enabled) {
                debugPatch.dumpChanges = dumpChanges(this.state);
            }
            // get patch bytes
            const patches = this.state.encode(false, [], this.useFilters);
            if (!this.useFilters) {
                // encode changes once, for all clients
                patches.unshift(Protocol.ROOM_STATE_PATCH);
                while (numClients--) {
                    const client = clients[numClients];
                    //
                    // FIXME: avoid this check.
                    //
                    if (client.state === ClientState.JOINED) {
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
                    if (client.state === ClientState.JOINED) {
                        const filteredPatches = this.state.applyFilters(client);
                        client.raw([Protocol.ROOM_STATE_PATCH, ...filteredPatches]);
                    }
                }
                this.state.discardAllChanges();
            }
            // debug patches
            if (debugPatch.enabled) {
                debugPatch('%d bytes sent to %d clients, %j', patches.length, clients.length, debugPatch.dumpChanges);
            }
        }
        return hasChanges;
    }
    handshake() {
        /**
         * Cache handshake to avoid encoding it for each client joining
         */
        if (!this.handshakeCache) {
            this.handshakeCache = (this.state && Reflection.encode(this.state));
        }
        return this.handshakeCache;
    }
}

export { SchemaSerializer };
//# sourceMappingURL=SchemaSerializer.mjs.map
