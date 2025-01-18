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
var Hash_exports = {};
__export(Hash_exports, {
  Hash: () => Hash
});
module.exports = __toCommonJS(Hash_exports);
var import_crypto = __toESM(require("crypto"));
class Hash {
  static async make(password, salt = process.env.AUTH_SALT || "## SALT ##") {
    return await this.algorithms[this.algorithm](password, salt);
  }
}
Hash.algorithm = "scrypt";
Hash.algorithms = {
  "sha1": (password, salt) => import_crypto.default.createHash("sha1").update(password + salt).digest("hex"),
  "scrypt": (password, salt) => new Promise((resolve, reject) => {
    import_crypto.default.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err)
        reject(err);
      resolve(derivedKey.toString("hex"));
    });
  })
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Hash
});
