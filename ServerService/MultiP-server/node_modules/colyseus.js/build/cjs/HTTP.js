// colyseus.js@0.15.18
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ServerError = require('./errors/ServerError.js');
var httpie = require('httpie');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var httpie__namespace = /*#__PURE__*/_interopNamespace(httpie);

var HTTP = /** @class */ (function () {
    function HTTP(client) {
        this.client = client;
    }
    HTTP.prototype.get = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("get", path, options);
    };
    HTTP.prototype.post = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("post", path, options);
    };
    HTTP.prototype.del = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("del", path, options);
    };
    HTTP.prototype.put = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("put", path, options);
    };
    HTTP.prototype.request = function (method, path, options) {
        if (options === void 0) { options = {}; }
        return httpie__namespace[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch(function (e) {
            var _a;
            throw new ServerError.ServerError(e.statusCode || -1, ((_a = e.data) === null || _a === void 0 ? void 0 : _a.error) || e.statusMessage || e.message || "offline");
        });
    };
    HTTP.prototype.getOptions = function (options) {
        if (this.authToken) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers['Authorization'] = "Bearer ".concat(this.authToken);
            options.withCredentials = true;
        }
        return options;
    };
    return HTTP;
}());

exports.HTTP = HTTP;
//# sourceMappingURL=HTTP.js.map
