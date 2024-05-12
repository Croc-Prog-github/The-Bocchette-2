"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerClearedError = void 0;
/**
 * An error that occurs when the promise of a {@link Clock.duration} is rejected because the timer has been cleared by the clock instance.
 */
class TimerClearedError extends Error {
    constructor() {
        super("Timer has been cleared");
    }
}
exports.TimerClearedError = TimerClearedError;
