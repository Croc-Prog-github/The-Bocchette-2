"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP = void 0;
const ServerError_1 = require("./errors/ServerError");
const httpie = __importStar(require("httpie"));
class HTTP {
    constructor(client) {
        this.client = client;
    }
    get(path, options = {}) {
        return this.request("get", path, options);
    }
    post(path, options = {}) {
        return this.request("post", path, options);
    }
    del(path, options = {}) {
        return this.request("del", path, options);
    }
    put(path, options = {}) {
        return this.request("put", path, options);
    }
    request(method, path, options = {}) {
        return httpie[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch((e) => {
            var _a;
            const status = e.statusCode; //  || -1
            const message = ((_a = e.data) === null || _a === void 0 ? void 0 : _a.error) || e.statusMessage || e.message; //  || "offline"
            if (!status && !message) {
                throw e;
            }
            throw new ServerError_1.ServerError(status, message);
        });
    }
    getOptions(options) {
        if (this.authToken) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers['Authorization'] = `Bearer ${this.authToken}`;
        }
        if (typeof (cc) !== 'undefined' && cc.sys && cc.sys.isNative) {
            //
            // Workaround for Cocos Creator on Native platform
            // "Cannot set property withCredentials of #<XMLHttpRequest> which has only a getter"
            //
        }
        else {
            // always include credentials
            options.withCredentials = true;
        }
        return options;
    }
}
exports.HTTP = HTTP;
//# sourceMappingURL=HTTP.js.map