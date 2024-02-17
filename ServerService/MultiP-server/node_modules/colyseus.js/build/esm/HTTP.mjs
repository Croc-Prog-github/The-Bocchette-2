// colyseus.js@0.15.18
import { ServerError } from './errors/ServerError.mjs';
import * as httpie from 'httpie';

class HTTP {
    client;
    authToken;
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
            throw new ServerError(e.statusCode || -1, e.data?.error || e.statusMessage || e.message || "offline");
        });
    }
    getOptions(options) {
        if (this.authToken) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers['Authorization'] = `Bearer ${this.authToken}`;
            options.withCredentials = true;
        }
        return options;
    }
}

export { HTTP };
//# sourceMappingURL=HTTP.mjs.map
