var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_dotenv = __toESM(require("dotenv"));
function getNodeEnv() {
  return process.env.NODE_ENV || "development";
}
function getRegion() {
  return (process.env.REGION || "unknown").toLowerCase();
}
function loadEnvFile(envFileOptions, log = "none") {
  const envPaths = [];
  envFileOptions.forEach((envFilename) => {
    envPaths.push(import_path.default.resolve(import_path.default.dirname(require?.main?.filename || process.cwd()), "..", envFilename));
    envPaths.push(import_path.default.resolve(process.cwd(), envFilename));
  });
  const envPath = envPaths.find((envPath2) => import_fs.default.existsSync(envPath2));
  if (envPath) {
    import_dotenv.default.config({ path: envPath });
    if (log !== "none") {
      console.info(`\u2705 ${import_path.default.basename(envPath)} loaded.`);
    }
  } else if (log === "both") {
    console.info(`\u2139\uFE0F  optional .env file not found: ${envFileOptions.join(", ")}`);
  }
}
if (process.env.COLYSEUS_CLOUD !== void 0) {
  loadEnvFile([`.env.cloud`]);
}
loadEnvFile([`.env.${getNodeEnv()}`, `.env`], "both");
if (process.env.REGION !== void 0) {
  loadEnvFile([`.env.${getRegion()}.${getNodeEnv()}`], "success");
}
