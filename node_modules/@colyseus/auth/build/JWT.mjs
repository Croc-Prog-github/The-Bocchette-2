import jsonwebtoken from "jsonwebtoken";
import { expressjwt } from "express-jwt";
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
      jsonwebtoken.sign(payload, getJWTSecret(), options, (err, token) => {
        if (err)
          reject(err.message);
        resolve(token);
      });
    });
  },
  verify: function(token, options) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, getJWTSecret(), options || JWT.settings.verify, function(err, decoded) {
        if (err)
          reject(err);
        resolve(decoded);
      });
    });
  },
  decode: jsonwebtoken.decode,
  middleware: function(params) {
    return expressjwt(Object.assign({
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
export {
  JWT
};
