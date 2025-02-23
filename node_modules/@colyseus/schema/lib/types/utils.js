"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spliceOne = spliceOne;
function spliceOne(arr, index) {
    // manually splice an array
    if (index === -1 || index >= arr.length) {
        return false;
    }
    const len = arr.length - 1;
    for (let i = index; i < len; i++) {
        arr[i] = arr[i + 1];
    }
    arr.length = len;
    return true;
}
//# sourceMappingURL=utils.js.map