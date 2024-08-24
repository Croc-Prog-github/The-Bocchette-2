"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
var core_1 = require("@colyseus/core");
var MyRoomState_1 = require("./schema/MyRoomState");
var MyRoom = /** @class */ (function (_super) {
    __extends(MyRoom, _super);
    function MyRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxClients = 4;
        return _this;
    }
    MyRoom.prototype.onCreate = function (options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("type", function (client, message) {
            //
            // handle "type" message
            //
        });
    };
    MyRoom.prototype.onJoin = function (client, options) {
        console.log(client.sessionId, "joined!");
    };
    MyRoom.prototype.onLeave = function (client, consented) {
        console.log(client.sessionId, "left!");
    };
    MyRoom.prototype.onDispose = function () {
        console.log("room", this.roomId, "disposing...");
    };
    return MyRoom;
}(core_1.Room));
exports.MyRoom = MyRoom;
