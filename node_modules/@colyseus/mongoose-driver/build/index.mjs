import { debugDriver } from '@colyseus/core';
import mongoose, { Schema } from 'mongoose';

const RoomCacheSchema = new Schema({
    clients: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    maxClients: { type: Number, default: Infinity },
    metadata: Schema.Types.Mixed,
    name: String,
    private: { type: Boolean, default: false },
    processId: String,
    roomId: String,
    unlisted: { type: Boolean, default: false }, // used for default LobbyRoom (prevent from showing up on room listing)
}, {
    strict: false,
    timestamps: true,
    versionKey: false,
});
RoomCacheSchema.index({ name: 1, locked: -1 });
RoomCacheSchema.index({ roomId: 1 });
const RoomCache = mongoose.model('RoomCache', RoomCacheSchema);
class MongooseDriver {
    constructor(connectionURI) {
        if (mongoose.connection.readyState === mongoose.STATES.disconnected) {
            connectionURI = connectionURI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/colyseus';
            mongoose.connect(connectionURI, {
                autoIndex: true,
                useCreateIndex: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            debugDriver("🗄️ Connected to", connectionURI);
        }
    }
    createInstance(initialValues = {}) {
        return new RoomCache(initialValues);
    }
    async find(conditions, additionalProjectionFields = {}) {
        return (await RoomCache.find(conditions, {
            _id: false,
            clients: true,
            createdAt: true,
            locked: true,
            maxClients: true,
            metadata: true,
            name: true,
            roomId: true,
            ...additionalProjectionFields,
        }));
    }
    findOne(conditions) {
        return (RoomCache.findOne(conditions, {
            _id: 0,
        }));
    }
    async clear() {
        await RoomCache.deleteMany({});
    }
    async shutdown() {
        await mongoose.disconnect();
    }
}

export { MongooseDriver };
//# sourceMappingURL=index.mjs.map
