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
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(auth_exports);
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_express = __toESM(require("express"));
var import_fs = require("fs");
var import_core = require("@colyseus/core");
var import_oauth = require("./oauth");
var import_JWT = require("./JWT");
var import_Hash = require("./Hash");
;
let onFindUserByEmail = (email) => {
  throw new Error("`auth.settings.onFindUserByEmail` not implemented.");
};
let onRegisterWithEmailAndPassword = () => {
  throw new Error("`auth.settings.onRegisterWithEmailAndPassword` not implemented.");
};
let onForgotPassword = () => {
  throw new Error("`auth.settings.onForgotPassword` not implemented.");
};
let onParseToken = (jwt) => jwt;
let onGenerateToken = async (userdata) => await import_JWT.JWT.sign(userdata);
let onHashPassword = async (password) => import_Hash.Hash.make(password);
const htmlTemplatePath = [
  import_path.default.join(process.cwd(), "html"),
  import_path.default.join(__dirname, "..", "html")
].find((filePath) => (0, import_fs.existsSync)(filePath));
const RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES = 30;
const auth = {
  oauth: import_oauth.oauth,
  settings: {
    onFindUserByEmail,
    onRegisterWithEmailAndPassword,
    onRegisterAnonymously: void 0,
    onSendEmailConfirmation: void 0,
    onEmailConfirmed: void 0,
    onForgotPassword,
    onResetPassword: void 0,
    onParseToken,
    onGenerateToken,
    onHashPassword
  },
  prefix: "/auth",
  middleware: import_JWT.JWT.middleware,
  routes: function(settings = {}) {
    console.warn(`
@colyseus/auth API's are in beta and may change in the future.
Please give feedback and report any issues you may find at https://github.com/colyseus/colyseus/issues/660
`);
    const router = import_express.default.Router();
    Object.keys(settings).forEach((key) => {
      auth.settings[key] = settings[key];
    });
    if (!auth.settings.onParseToken) {
      auth.settings.onParseToken = onParseToken;
    }
    if (!auth.settings.onGenerateToken) {
      auth.settings.onGenerateToken = onGenerateToken;
    }
    if (!auth.settings.onHashPassword) {
      auth.settings.onHashPassword = onHashPassword;
    }
    if (settings.onOAuthProviderCallback) {
      import_oauth.oauth.onCallback(settings.onOAuthProviderCallback);
    }
    if (import_oauth.oAuthProviderCallback) {
      const prefix = import_oauth.oauth.prefix;
      import_oauth.oauth.prefix = auth.prefix + prefix;
      router.use(prefix, import_oauth.oauth.routes());
    }
    router.get("/userdata", auth.middleware(), async (req, res) => {
      try {
        res.json({ user: await auth.settings.onParseToken(req.auth) });
      } catch (e) {
        res.status(401).json({ error: e.message });
      }
    });
    router.post("/login", import_express.default.json(), async (req, res) => {
      try {
        const email = req.body.email;
        if (!isValidEmail(email)) {
          throw new Error("email_malformed");
        }
        const user = await auth.settings.onFindUserByEmail(email);
        if (user && user.password === await import_Hash.Hash.make(req.body.password)) {
          delete user.password;
          res.json({ user, token: await auth.settings.onGenerateToken(user) });
        } else {
          throw new Error("invalid_credentials");
        }
      } catch (e) {
        import_core.logger.error(e);
        res.status(401).json({ error: e.message });
      }
    });
    router.post("/register", import_express.default.json(), async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "email_malformed" });
      }
      let existingUser;
      try {
        existingUser = await auth.settings.onFindUserByEmail(email);
      } catch (e) {
        import_core.logger.error("@colyseus/auth, onFindUserByEmail exception:" + e.stack);
      }
      try {
        if (existingUser) {
          throw new Error("email_already_in_use");
        }
        if (!isValidPassword(password)) {
          return res.status(400).json({ error: "password_too_short" });
        }
        const options = req.body.options || {};
        if (req.headers.authorization) {
          const authHeader = req.headers.authorization;
          const authToken = authHeader.startsWith("Bearer ") && authHeader.substring(7, authHeader.length) || void 0;
          options.upgradingToken = await import_JWT.JWT.verify(authToken);
        }
        await auth.settings.onRegisterWithEmailAndPassword(email, await import_Hash.Hash.make(password), options);
        const user = await auth.settings.onFindUserByEmail(email);
        delete user.password;
        const token = await auth.settings.onGenerateToken(user);
        if (typeof auth.settings.onSendEmailConfirmation === "function") {
          const fullUrl = req.protocol + "://" + req.get("host");
          const confirmEmailLink = fullUrl + auth.prefix + "/confirm-email?token=" + token;
          const html = (await import_promises.default.readFile(import_path.default.join(htmlTemplatePath, "address-confirmation-email.html"), "utf-8")).replace("[LINK]", confirmEmailLink);
          await auth.settings.onSendEmailConfirmation(email, html, confirmEmailLink);
        }
        res.json({ user, token });
      } catch (e) {
        import_core.logger.error(e);
        res.status(401).json({ error: e.message });
      }
    });
    router.get("/confirm-email", async (req, res) => {
      if (typeof auth.settings.onEmailConfirmed !== "function") {
        return res.status(404).end("Not found.");
      }
      try {
        const token = (req.query.token || "").toString();
        const data = await import_JWT.JWT.verify(token);
        await auth.settings.onEmailConfirmed(data.email);
        res.redirect(auth.prefix + "/confirm-email?success=" + encodeURIComponent("Email confirmed successfully!"));
      } catch (e) {
        res.redirect(auth.prefix + "/confirm-email?error=" + e.message);
      }
    });
    router.post("/anonymous", import_express.default.json(), async (req, res) => {
      try {
        const options = req.body.options;
        const user = auth.settings.onRegisterAnonymously ? await auth.settings.onRegisterAnonymously(options) : { ...options, id: void 0, anonymousId: (0, import_core.generateId)(21), anonymous: true };
        res.json({
          user,
          token: await onGenerateToken(user)
        });
      } catch (e) {
        res.status(401).json({ error: e.message });
      }
    });
    router.post("/forgot-password", import_express.default.json(), async (req, res) => {
      try {
        if (typeof auth.settings.onForgotPassword !== "function") {
          throw new Error("auth.settings.onForgotPassword must be implemented.");
        }
        if (typeof auth.settings.onResetPassword !== "function") {
          throw new Error("auth.settings.onResetPassword must be implemented.");
        }
        const email = req.body.email;
        const user = await auth.settings.onFindUserByEmail(email);
        if (!user) {
          throw new Error("email_not_found");
        }
        const token = await import_JWT.JWT.sign({ email }, { expiresIn: RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES + "m" });
        const fullUrl = req.protocol + "://" + req.get("host");
        const passwordResetLink = fullUrl + auth.prefix + "/reset-password?token=" + token;
        const html = (await import_promises.default.readFile(import_path.default.join(htmlTemplatePath, "reset-password-email.html"), "utf-8")).replace("[LINK]", passwordResetLink);
        const result = await auth.settings.onForgotPassword(email, html, passwordResetLink) ?? true;
        res.json(result);
      } catch (e) {
        res.status(401).json({ error: e.message });
      }
    });
    router.get("/reset-password", async (req, res) => {
      try {
        const token = (req.query.token || "").toString();
        const htmlForm = (await import_promises.default.readFile(import_path.default.join(htmlTemplatePath, "reset-password-form.html"), "utf-8")).replace("[ACTION]", auth.prefix + "/reset-password").replace("[TOKEN]", token);
        res.set("content-type", "text/html").send(htmlForm);
      } catch (e) {
        import_core.logger.debug(e);
        res.end(`Error: ${e.message}`);
      }
    });
    router.post("/reset-password", import_express.default.urlencoded({ extended: false }), async (req, res) => {
      const token = req.body.token;
      const password = req.body.password;
      try {
        const data = await import_JWT.JWT.verify(token);
        if (import_core.matchMaker.presence?.get("reset-password:" + token)) {
          throw new Error("token_already_used");
        }
        if (!isValidPassword(password)) {
          throw new Error("Password is too short.");
        }
        const result = await auth.settings.onResetPassword(data.email, await import_Hash.Hash.make(password)) ?? true;
        if (!result) {
          throw new Error("Could not reset password.");
        }
        import_core.matchMaker.presence?.setex("reset-password:" + token, "1", 60 * RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES);
        res.redirect(auth.prefix + "/reset-password?success=" + encodeURIComponent("Password reset successfully!"));
      } catch (e) {
        res.redirect(auth.prefix + "/reset-password?token=" + token + "&error=" + e.message);
      }
    });
    return router;
  }
};
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);
}
function isValidPassword(password) {
  return password.length >= 6;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});
