import fs from "fs";
import path from "path";
import express from "express";
import grant from "grant";
import session from "express-session";
import { auth } from "./auth";
import { matchMaker, logger } from "@colyseus/core";
import RedisStore from "connect-redis";
import { JWT } from "./JWT";
let oAuthProviderCallback = async (data, provider) => {
  console.debug("OAuth callback missing. Use oauth.onCallback() to persist user data.");
  return data;
};
const oauth = {
  defaults: {
    transport: "session",
    state: true,
    response: ["tokens", "raw", "profile"]
  },
  prefix: "/provider",
  providers: {},
  addProvider: function(providerId, config) {
    this.providers[providerId] = config;
  },
  onCallback: function(callback) {
    oAuthProviderCallback = callback;
  },
  routes: function(callback) {
    if (callback) {
      this.onCallback(callback);
    }
    const router = express.Router();
    matchMaker.onReady.then(() => {
      const store = matchMaker.presence["pub"] ? new RedisStore({ client: matchMaker.presence["pub"] }) : void 0;
      const sessionMiddleware = session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store
      });
      const config = Object.assign({ defaults: this.defaults }, this.providers);
      config.defaults.prefix = oauth.prefix;
      if (!this.defaults.origin) {
        const isProduction = process.env.NODE_ENV && process.env.NODE_ENV !== "development" || process.env.COLYSEUS_CLOUD;
        const hostname = process.env.SUBDOMAIN && process.env.SERVER_NAME ? `${process.env.SUBDOMAIN}.${process.env.SERVER_NAME}` : `localhost:${process.env.PORT || "2567"}`;
        this.defaults.origin = `${isProduction ? "https" : "http"}://${hostname}`;
        logger.info(`OAuth: 'auth.oauth.defaults.origin' not set. Guessing it from environment: '${this.defaults.origin}'`);
      }
      router.use(sessionMiddleware);
      router.get("/:providerId", async (req, res, next) => {
        const providerId = req.params.providerId;
        if (oauth.providers[providerId]) {
          next();
        } else {
          if (process.env.NODE_ENV === "production") {
            res.send(`Missing OAuth provider configuration for "${providerId}".`);
          } else {
            const helpURLs = JSON.parse(fs.readFileSync(path.normalize(__dirname + "/../oauth_help_urls.json")).toString());
            const providerUrl = helpURLs[providerId];
            res.send(`<!doctype html>
<html>
<head>
<title>Missing "${providerId}" provider configuration</title>
<style>p { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"; }</style>
</head>
<body>
<p>Missing config for "${providerId}" OAuth provider.</p>
<hr />
<p><small><strong>Config example:</strong></small></p>
<pre><code>import { auth } from "@colyseus/auth";<br />
auth.oauth.addProvider("${providerId}", {
  key: "xxx",
  secret: "xxx",
});
</code></pre>
${providerUrl ? `<hr/><p><small><em>(Get your keys from <a href="${providerUrl}" target="_blank">${providerUrl}</a>)</em></small></p>` : ""}
</body>
</html>`);
          }
        }
      });
      router.use(grant.express(config));
      router.get("/:providerId/callback", async (req, res) => {
        const session2 = req.session;
        let user = null;
        let token = null;
        let response = void 0;
        if (session2.grant.response.error) {
          response = { error: session2.grant.response.error, user, token };
        } else {
          const data = session2.grant.response;
          if (session2.grant.dynamic?.token) {
            data.upgradingToken = await JWT.verify(session2.grant.dynamic?.token);
          }
          if (data.profile) {
            data.profile = oauth.transformProfileData(data.profile);
          }
          user = await oAuthProviderCallback(data, session2.grant.provider);
          token = await auth.settings.onGenerateToken(user);
          response = { user, token };
        }
        res.send(`<!DOCTYPE html><html><head><script type="text/javascript">window.opener.postMessage(${JSON.stringify(response)}, '*');<\/script></head><body></body></html>`);
        res.end();
      });
    });
    return router;
  },
  transformProfileData(raw) {
    if (raw.data && Array.isArray(raw.data) && raw.data.length === 1) {
      return raw.data[0];
    } else {
      return raw;
    }
  }
};
export {
  oAuthProviderCallback,
  oauth
};
