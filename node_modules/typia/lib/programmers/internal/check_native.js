"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_native = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
/**
 * @internal
 */
var check_native = function (type) { return function (input) {
    var instanceOf = ExpressionFactory_1.ExpressionFactory.isInstanceOf(type)(input);
    return ATOMIC_LIKE.has(type)
        ? typescript_1.default.factory.createLogicalOr(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral(type.toLowerCase()), typescript_1.default.factory.createTypeOfExpression(input)), instanceOf)
        : instanceOf;
}; };
exports.check_native = check_native;
var ATOMIC_LIKE = new Set(["Boolean", "Number", "String"]);
//# sourceMappingURL=check_native.js.map