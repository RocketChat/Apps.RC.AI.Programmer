"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_bigint = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
/**
 * @internal
 */
var check_bigint = function (project) {
    return function (atomic) {
        return function (input) {
            var conditions = check_bigint_type_tags(project)(atomic)(input);
            return {
                expected: atomic.getName(),
                expression: typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("bigint"), typescript_1.default.factory.createTypeOfExpression(input)),
                conditions: conditions,
            };
        };
    };
};
exports.check_bigint = check_bigint;
/**
 * @internal
 */
var check_bigint_type_tags = function (project) {
    return function (atomic) {
        return function (input) {
            return atomic.tags
                .map(function (row) { return row.filter(function (tag) { return !!tag.validate; }); })
                .filter(function (row) { return !!row.length; })
                .map(function (row) {
                return row.map(function (tag) {
                    var _a;
                    return ({
                        expected: "bigint & ".concat(tag.name),
                        expression: ((_a = tag.predicate) !== null && _a !== void 0 ? _a : ExpressionFactory_1.ExpressionFactory.transpile(project.context)(tag.validate))(input),
                    });
                });
            });
        };
    };
};
//# sourceMappingURL=check_bigint.js.map