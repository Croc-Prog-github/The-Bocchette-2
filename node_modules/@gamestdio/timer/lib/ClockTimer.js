"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockTimer = void 0;
const clock_1 = __importDefault(require("@gamestdio/clock"));
const Delayed_1 = require("./Delayed");
const TimerClearedError_1 = require("./TimerClearedError");
class ClockTimer extends clock_1.default {
    constructor(autoStart = false) {
        super(autoStart);
        /**
         * An array of all the scheduled timeouts and intervals.
         * @private For compatibility it's public but avoid modifying it directly.
         */
        this.delayed = [];
    }
    /**
     * Re-evaluate all the scheduled timeouts and intervals and execute appropriate handlers.
     * Use this in your own context or not if your passed `autoStart` as `true` in the constructor.
     */
    tick() {
        super.tick();
        let delayedList = this.delayed;
        let i = delayedList.length;
        while (i--) {
            const delayed = delayedList[i];
            if (delayed.active) {
                delayed.tick(this.deltaTime);
            }
            else {
                delayedList.splice(i, 1);
                continue;
            }
        }
    }
    /**
     * Schedule a function to be called every `time` milliseconds.
     * This `time` minimum value will be tied to the `tick` method of the clock. This means if you use the default `autoStart` value from the constructor, the minimum value will be 16ms. Otherwise it will depend on your `tick` method call.
     *
     * Returns a {@link Delayed} object that can be used to clear the timeout or play around with it.
     */
    setInterval(handler, time, ...args) {
        const delayed = new Delayed_1.Delayed(handler, args, time, Delayed_1.Type.Interval);
        this.delayed.push(delayed);
        return delayed;
    }
    /**
     * Schedule a function to be called after a delay.
     *
     * This `time` minimum value will be tied to the `tick` method of the clock. This means if you use the default `autoStart` value from the constructor, the minimum value will be 16ms. Otherwise it will depend on your `tick` method call.
     *
     * Returns a {@link Delayed} object that can be used to clear the timeout or play around with it.
     */
    setTimeout(handler, time, ...args) {
        const delayed = new Delayed_1.Delayed(handler, args, time, Delayed_1.Type.Timeout);
        this.delayed.push(delayed);
        return delayed;
    }
    /**
     * A promise that schedule a timeout that will resolves after the given time.
     *
     * If the {@link Delayed} instance is cleared before the time, the promise will be rejected. This happens when the {@link ClockTimer.clear} method is called.
     *
     * For the sake of simplicity of this API, you can only cancel a timeout scheduled with this method with {@link ClockTimer.clear} method (which clears all scheduled timeouts and intervals).
     * If you need fine-tuned control over the timeout, use the {@link ClockTimer.setTimeout} method instead.
     *
     * @example **Inside an async function**
     * ```typescript
     * const timer = new Clock(true);
     * await timer.duration(1000);
     * console.log("1 second later");
     * ```
     *
     * @example **Using the promise**
     * ```typescript
     * const timer = new Clock(true);
     * timer.duration(1000).then(() => console.log("1 second later"));
     * ```
     *
     * @example **Using the promise with error**
     * ```typescript
     * const timer = new Clock(true);
     * timer.duration(1000).then(() => console.log("1 second later")).catch(() => console.log("Timer cleared"));
     * timer.clear();
     * ```
     *
     *
     * @param ms the duration in milliseconds in which the promise will be resolved
     */
    duration(ms) {
        return new Promise((resolve, reject) => {
            const delayed = new Delayed_1.Delayed(resolve, undefined, ms, Delayed_1.Type.Async);
            delayed.clear = () => {
                delayed.active = false;
                reject(new TimerClearedError_1.TimerClearedError()); // To be able to use instanceof in try / catch blocks
            };
            this.delayed.push(delayed);
        });
    }
    /**
     * Delete any scheduled timeout or interval. That will never be executed.
     *
     * If some of the timeouts/intervals are already executed, they will be removed from the list and callback will be garbage collected.
     * For timeout created with {@link ClockTimer.duration}, the promise will be rejected and therefore the unused resolving callback will be garbage collected.
     */
    clear() {
        let i = this.delayed.length;
        while (i--) {
            this.delayed[i].clear();
        }
        this.delayed = [];
    }
}
exports.ClockTimer = ClockTimer;
