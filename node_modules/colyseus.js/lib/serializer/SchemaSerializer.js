"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = void 0;
exports.getStateCallbacks = getStateCallbacks;
const schema_1 = require("@colyseus/schema");
function getStateCallbacks(room) {
    try {
        // SchemaSerializer
        return (0, schema_1.getDecoderStateCallbacks)(room['serializer'].decoder);
    }
    catch (e) {
        // NoneSerializer
        return undefined;
    }
}
class SchemaSerializer {
    setState(encodedState, it) {
        this.decoder.decode(encodedState, it);
    }
    getState() {
        return this.state;
    }
    patch(patches, it) {
        return this.decoder.decode(patches, it);
    }
    teardown() {
        this.decoder.root.clearRefs();
    }
    handshake(bytes, it) {
        if (this.state) {
            //
            // TODO: validate definitions against concreate this.state instance
            //
            schema_1.Reflection.decode(bytes, it); // no-op
            this.decoder = new schema_1.Decoder(this.state);
        }
        else {
            // initialize reflected state from server
            this.decoder = schema_1.Reflection.decode(bytes, it);
            this.state = this.decoder.state;
        }
    }
}
exports.SchemaSerializer = SchemaSerializer;
//# sourceMappingURL=SchemaSerializer.js.map