"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSerializer = registerSerializer;
exports.getSerializer = getSerializer;
const serializers = {};
function registerSerializer(id, serializer) {
    serializers[id] = serializer;
}
function getSerializer(id) {
    const serializer = serializers[id];
    if (!serializer) {
        throw new Error("missing serializer: " + id);
    }
    return serializer;
}
//# sourceMappingURL=Serializer.js.map