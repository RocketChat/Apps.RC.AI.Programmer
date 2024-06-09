"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dictionary = void 0;
/**
 * @internal
 */
var blackhole = {};
exports.$dictionary = (function () {
    var _a;
    var glob = typeof global === "object" &&
        typeof global.process === "object" &&
        typeof global.process.versions === "object" &&
        typeof global.process.versions.node !== "undefined"
        ? (global !== null && global !== void 0 ? global : blackhole)
        : (self !== null && self !== void 0 ? self : blackhole);
    return ((_a = glob.__typia_custom_validator) !== null && _a !== void 0 ? _a : (glob.__typia_custom_validator = new Map()));
})();
//# sourceMappingURL=$dictionary.js.map