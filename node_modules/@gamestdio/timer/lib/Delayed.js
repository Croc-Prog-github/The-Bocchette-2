"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delayed = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["Interval"] = 0] = "Interval";
    Type[Type["Timeout"] = 1] = "Timeout";
    Type[Type["Async"] = 2] = "Async";
})(Type || (exports.Type = Type = {}));
class Delayed {
    constructor(handler, args, time, type) {
        this.active = true;
        this.paused = false;
        this.elapsedTime = 0;
        this.handler = handler;
        this.args = args;
        this.time = time;
        this.type = type;
    }
    tick(deltaTime) {
        if (this.paused) {
            return;
        }
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.time) {
            this.execute();
        }
    }
    execute() {
        this.handler.apply(this, this.args);
        switch (this.type) {
            case Type.Timeout:
            case Type.Async:
                this.active = false;
                break;
            case Type.Interval:
                this.elapsedTime -= this.time;
                break;
        }
    }
    reset() {
        this.elapsedTime = 0;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    clear() {
        this.active = false;
    }
}
exports.Delayed = Delayed;
