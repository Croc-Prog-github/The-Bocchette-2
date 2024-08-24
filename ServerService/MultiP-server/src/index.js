"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to host your server on Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually
 * instantiate a Colyseus Server as documented here:
 *
 * See: https://docs.colyseus.io/server/api/#constructor-options
 */
var tools_1 = require("@colyseus/tools");
// Import Colyseus config
var app_config_1 = require("./app.config");
// Create and listen on 2567 (or PORT environment variable.)
(0, tools_1.listen)(app_config_1.default);
