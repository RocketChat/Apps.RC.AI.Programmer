"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify_native = void 0;
var typescript_1 = __importDefault(require("typescript"));
/**
 * @internal
 */
var stringify_native = function () {
    return typescript_1.default.factory.createStringLiteral("{}");
};
exports.stringify_native = stringify_native;
//# sourceMappingURL=stringify_native.js.map