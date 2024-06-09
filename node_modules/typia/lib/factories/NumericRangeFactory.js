"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericRangeFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("./ExpressionFactory");
var NumericRangeFactory;
(function (NumericRangeFactory) {
    NumericRangeFactory.number = function (type) {
        return function (input) {
            return NumberPredicator[type](input);
        };
    };
    NumericRangeFactory.bigint = function (type) {
        return function (input) {
            return BigIntPredicator[type](input);
        };
    };
})(NumericRangeFactory || (exports.NumericRangeFactory = NumericRangeFactory = {}));
var NumberPredicator;
(function (NumberPredicator) {
    NumberPredicator.int32 = function (input) {
        return typescript_1.default.factory.createLogicalAnd(integer(input), between("-2147483648", "2147483647")(input));
    };
    NumberPredicator.uint32 = function (input) {
        return typescript_1.default.factory.createLogicalAnd(integer(input), between("0", "4294967295")(input));
    };
    NumberPredicator.int64 = function (input) {
        return typescript_1.default.factory.createLogicalAnd(integer(input), between("-9223372036854775808", "9223372036854775807")(input));
    };
    NumberPredicator.uint64 = function (input) {
        return typescript_1.default.factory.createLogicalAnd(integer(input), between("0", "18446744073709551615")(input));
    };
    NumberPredicator.float = function (input) {
        return between("-1.175494351e38", "3.4028235e38")(input);
    };
    NumberPredicator.double = function () { return typescript_1.default.factory.createTrue(); };
})(NumberPredicator || (NumberPredicator = {}));
var BigIntPredicator;
(function (BigIntPredicator) {
    BigIntPredicator.int64 = function () { return typescript_1.default.factory.createTrue(); };
    BigIntPredicator.uint64 = function (input) {
        return typescript_1.default.factory.createLessThanEquals(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("BigInt"), undefined, [ExpressionFactory_1.ExpressionFactory.number(0)]), input);
    };
})(BigIntPredicator || (BigIntPredicator = {}));
var integer = function (input) {
    return typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Math.floor"), undefined, [input]), input);
};
var between = function (x, y) { return function (input) {
    return typescript_1.default.factory.createLogicalAnd(typescript_1.default.factory.createLessThanEquals(typescript_1.default.factory.createIdentifier(x), input), typescript_1.default.factory.createLessThanEquals(input, typescript_1.default.factory.createIdentifier(y)));
}; };
//# sourceMappingURL=NumericRangeFactory.js.map