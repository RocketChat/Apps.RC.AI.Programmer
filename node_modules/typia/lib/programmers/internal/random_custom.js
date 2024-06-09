"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_custom = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var LiteralFactory_1 = require("../../factories/LiteralFactory");
/**
 * @internal
 */
var random_custom = function (accessor) {
    return function (type) {
        return function (tags) {
            return function (expression) {
                return ExpressionFactory_1.ExpressionFactory.coalesce(typescript_1.default.factory.createCallChain(typescript_1.default.factory.createPropertyAccessChain(accessor("customs"), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.default.factory.createIdentifier(type)), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), undefined, [
                    LiteralFactory_1.LiteralFactory.generate(tags.map(function (t) { return ({
                        name: t.name,
                        kind: t.kind,
                        value: t.value,
                    }); })),
                ]))(expression);
            };
        };
    };
};
exports.random_custom = random_custom;
//# sourceMappingURL=random_custom.js.map