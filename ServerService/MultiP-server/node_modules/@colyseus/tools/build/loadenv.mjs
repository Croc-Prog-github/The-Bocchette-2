import fs from "fs";
import path from "path";
import dotenv from "dotenv";
function getNodeEnv() {
  return process.env.NODE_ENV || "development";
}
function getRegion() {
  return (process.env.REGION || "unknown").toLowerCase();
}
function loadEnvFile(envFileOptions, log = "none") {
  const envPaths = [];
  envFileOptions.forEach((envFilename) => {
    envPaths.push(path.resolve(path.dirname(require?.main?.filename || process.cwd()), "..", envFilename));
    envPaths.push(path.resolve(process.cwd(), envFilename));
  });
  const envPath = envPaths.find((envPath2) => fs.existsSync(envPath2));
  if (envPath) {
    dotenv.config({ path: envPath });
    if (log !== "none") {
      console.info(`\u2705 ${path.basename(envPath)} loaded.`);
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
