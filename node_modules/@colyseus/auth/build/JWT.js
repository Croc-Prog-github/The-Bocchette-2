var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var JWT_exports = {};
__export(JWT_exports, {
  JWT: () => JWT
});
module.exports = __toCommonJS(JWT_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_express_jwt = require("express-jwt");
const JWT = {
  settings: {
    secret: void 0,
    verify: {
      algorithms: ["HS256"]
    }
  },
  sign: function(payload, options = {}) {
    return new Promise((resolve, reject) => {
      if (options.algorithm === void 0) {
        options.algorithm = JWT.settings.verify.algorithms[0];
      }
      import_jsonwebtoken.default.sign(payload, getJWTSecret(), options, (err, token) => {
        if (err)
          reject(err.message);
        resolve(token);
      });
    });
  },
  verify: function(token, options) {
    return new Promise((resolve, reject) => {
      import_jsonwebtoken.default.verify(token, getJWTSecret(), options || JWT.settings.verify, function(err, decoded) {
        if (err)
          reject(err);
        resolve(decoded);
      });
    });
  },
  decode: import_jsonwebtoken.default.decode,
  middleware: function(params) {
    return (0, import_express_jwt.expressjwt)(Object.assign({
      secret: getJWTSecret(),
      algorithms: JWT.settings.verify.algorithms,
      ...JWT.settings.verify
    }, params));
  }
};
function getJWTSecret() {
  JWT.settings.secret ||= process.env.JWT_SECRET;
  if (!JWT.settings.secret) {
    console.error("\u274C Please provide 'JWT_SECRET' environment variable, or set 'JWT.settings.secret'.");
  }
  return JWT.settings.secret;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JWT
});
