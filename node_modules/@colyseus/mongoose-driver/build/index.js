'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@colyseus/core');
var mongoose = require('mongoose');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mongoose__default = /*#__PURE__*/_interopDefaultLegacy(mongoose);

const RoomCacheSchema = new mongoose.Schema({
    clients: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    maxClients: { type: Number, default: Infinity },
    metadata: mongoose.Schema.Types.Mixed,
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
const RoomCache = mongoose__default['default'].model('RoomCache', RoomCacheSchema);
class MongooseDriver {
    constructor(connectionURI) {
        if (mongoose__default['default'].connection.readyState === mongoose__default['default'].STATES.disconnected) {
            connectionURI = connectionURI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/colyseus';
            mongoose__default['default'].connect(connectionURI, {
                autoIndex: true,
                useCreateIndex: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            core.debugDriver("🗄️ Connected to", connectionURI);
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
        await mongoose__default['default'].disconnect();
    }
}

exports.MongooseDriver = MongooseDriver;
//# sourceMappingURL=index.js.map
