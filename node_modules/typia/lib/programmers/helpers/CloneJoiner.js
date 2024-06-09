"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneJoiner = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var Escaper_1 = require("../../utils/Escaper");
var metadata_to_pattern_1 = require("../internal/metadata_to_pattern");
var CloneJoiner;
(function (CloneJoiner) {
    CloneJoiner.object = function (input, entries) {
        if (entries.length === 0)
            return typescript_1.default.factory.createIdentifier("{}");
        var regular = entries.filter(function (e) { return e.key.isSoleLiteral(); });
        var dynamic = entries.filter(function (e) { return !e.key.isSoleLiteral(); });
        var literal = typescript_1.default.factory.createObjectLiteralExpression(regular.map(function (entry) {
            var str = entry.key.getSoleLiteral();
            return typescript_1.default.factory.createPropertyAssignment(Escaper_1.Escaper.variable(str) ? str : typescript_1.default.factory.createStringLiteral(str), entry.expression);
        }), true);
        if (dynamic.length === 0)
            return literal;
        var key = typescript_1.default.factory.createIdentifier("key");
        var output = typescript_1.default.factory.createIdentifier("output");
        var statements = [];
        if (regular.length !== 0)
            statements.push(typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createArrayLiteralExpression(regular.map(function (r) {
                return typescript_1.default.factory.createStringLiteral(r.key.getSoleLiteral());
            })))("some"), undefined, [
                typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("regular")], undefined, undefined, typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("regular"), typescript_1.default.factory.createIdentifier("key"))),
            ]), typescript_1.default.factory.createContinueStatement()));
        statements.push.apply(statements, __spreadArray([], __read(dynamic.map(function (entry) {
            return typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("RegExp(/".concat((0, metadata_to_pattern_1.metadata_to_pattern)(true)(entry.key), "/).test")), undefined, [key]), typescript_1.default.factory.createBlock([
                typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createElementAccessExpression(output, key), typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), entry.expression)),
                typescript_1.default.factory.createContinueStatement(),
            ]));
        })), false));
        return typescript_1.default.factory.createBlock([
            StatementFactory_1.StatementFactory.constant("output", typescript_1.default.factory.createAsExpression(literal, TypeFactory_1.TypeFactory.keyword("any"))),
            typescript_1.default.factory.createForOfStatement(undefined, StatementFactory_1.StatementFactory.entry("key")("value"), typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.entries"), undefined, [input]), typescript_1.default.factory.createBlock(statements)),
            typescript_1.default.factory.createReturnStatement(output),
        ]);
    };
    CloneJoiner.tuple = function (children, rest) {
        return typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createArrayLiteralExpression(rest === null
            ? children
            : __spreadArray(__spreadArray([], __read(children), false), [typescript_1.default.factory.createSpreadElement(rest)], false), true), TypeFactory_1.TypeFactory.keyword("any"));
    };
    CloneJoiner.array = function (input, arrow) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createPropertyAccessExpression(input, "map"), undefined, [arrow]);
    };
})(CloneJoiner || (exports.CloneJoiner = CloneJoiner = {}));
//# sourceMappingURL=CloneJoiner.js.map