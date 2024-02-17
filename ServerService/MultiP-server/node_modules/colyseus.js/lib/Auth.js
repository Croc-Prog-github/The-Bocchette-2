"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Auth__initialized, _Auth__initializationPromise, _Auth__signInWindow, _Auth__events;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const Storage_1 = require("./Storage");
const nanoevents_1 = require("./core/nanoevents");
class Auth {
    constructor(http) {
        this.http = http;
        this.settings = {
            path: "/auth",
            key: "colyseus-auth-token",
        };
        _Auth__initialized.set(this, false);
        _Auth__initializationPromise.set(this, void 0);
        _Auth__signInWindow.set(this, undefined);
        _Auth__events.set(this, (0, nanoevents_1.createNanoEvents)());
        (0, Storage_1.getItem)(this.settings.key, (token) => this.token = token);
    }
    set token(token) {
        this.http.authToken = token;
    }
    get token() {
        return this.http.authToken;
    }
    onChange(callback) {
        const unbindChange = __classPrivateFieldGet(this, _Auth__events, "f").on("change", callback);
        if (!__classPrivateFieldGet(this, _Auth__initialized, "f")) {
            __classPrivateFieldSet(this, _Auth__initializationPromise, new Promise((resolve, reject) => {
                this.getUserData().then((userData) => {
                    this.emitChange(Object.assign(Object.assign({}, userData), { token: this.token }));
                }).catch((e) => {
                    // user is not logged in, or service is down
                    this.emitChange({ user: null, token: undefined });
                }).finally(() => {
                    resolve();
                });
            }), "f");
        }
        __classPrivateFieldSet(this, _Auth__initialized, true, "f");
        return unbindChange;
    }
    getUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.token) {
                return (yield this.http.get(`${this.settings.path}/userdata`)).data;
            }
            else {
                throw new Error("missing auth.token");
            }
        });
    }
    registerWithEmailAndPassword(email, password, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield this.http.post(`${this.settings.path}/register`, {
                body: { email, password, options, },
            })).data;
            this.emitChange(data);
            return data;
        });
    }
    signInWithEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield this.http.post(`${this.settings.path}/login`, {
                body: { email, password, },
            })).data;
            this.emitChange(data);
            return data;
        });
    }
    signInAnonymously(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield this.http.post(`${this.settings.path}/anonymous`, {
                body: { options, }
            })).data;
            this.emitChange(data);
            return data;
        });
    }
    sendPasswordResetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.http.post(`${this.settings.path}/forgot-password`, {
                body: { email, }
            })).data;
        });
    }
    signInWithProvider(providerName, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const w = settings.width || 480;
                const h = settings.height || 768;
                // forward existing token for upgrading
                const upgradingToken = this.token ? `?token=${this.token}` : "";
                // Capitalize first letter of providerName
                const title = `Login with ${(providerName[0].toUpperCase() + providerName.substring(1))}`;
                const url = this.http['client']['getHttpEndpoint'](`${(settings.prefix || `${this.settings.path}/provider`)}/${providerName}${upgradingToken}`);
                const left = (screen.width / 2) - (w / 2);
                const top = (screen.height / 2) - (h / 2);
                __classPrivateFieldSet(this, _Auth__signInWindow, window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left), "f");
                const onMessage = (event) => {
                    // TODO: it is a good idea to check if event.origin can be trusted!
                    // if (event.origin.indexOf(window.location.hostname) === -1) { return; }
                    // require 'user' and 'token' inside received data.
                    if (event.data.user === undefined && event.data.token === undefined) {
                        return;
                    }
                    clearInterval(rejectionChecker);
                    __classPrivateFieldGet(this, _Auth__signInWindow, "f").close();
                    __classPrivateFieldSet(this, _Auth__signInWindow, undefined, "f");
                    window.removeEventListener("message", onMessage);
                    if (event.data.error !== undefined) {
                        reject(event.data.error);
                    }
                    else {
                        resolve(event.data);
                        this.emitChange(event.data);
                    }
                };
                const rejectionChecker = setInterval(() => {
                    if (!__classPrivateFieldGet(this, _Auth__signInWindow, "f") || __classPrivateFieldGet(this, _Auth__signInWindow, "f").closed) {
                        __classPrivateFieldSet(this, _Auth__signInWindow, undefined, "f");
                        reject("cancelled");
                        window.removeEventListener("message", onMessage);
                    }
                }, 200);
                window.addEventListener("message", onMessage);
            });
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitChange({ user: null, token: null });
        });
    }
    emitChange(authData) {
        if (authData.token !== undefined) {
            this.token = authData.token;
            if (authData.token === null) {
                (0, Storage_1.removeItem)(this.settings.key);
            }
            else {
                // store key in localStorage
                (0, Storage_1.setItem)(this.settings.key, authData.token);
            }
        }
        __classPrivateFieldGet(this, _Auth__events, "f").emit("change", authData);
    }
}
exports.Auth = Auth;
_Auth__initialized = new WeakMap(), _Auth__initializationPromise = new WeakMap(), _Auth__signInWindow = new WeakMap(), _Auth__events = new WeakMap();
//# sourceMappingURL=Auth.js.map