"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("@colyseus/tools");
var monitor_1 = require("@colyseus/monitor");
var playground_1 = require("@colyseus/playground");
/**
 * Import your Room files
 */
var MyRoom_1 = require("./rooms/MyRoom");
exports.default = (0, tools_1.default)({
    initializeGameServer: function (gameServer) {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom_1.MyRoom);
    },
    initializeExpress: function (app) {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.get("/hello_world", function (req, res) {
            res.send("It's time to kick ass and chew bubblegum!");
        });
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground_1.playground);
        }
        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", (0, monitor_1.monitor)());
    },
    beforeListen: function () {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
