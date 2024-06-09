"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var RandomGenerator_1 = require("../utils/RandomGenerator");
var ExpressionFactory;
(function (ExpressionFactory) {
    ExpressionFactory.number = function (value) {
        return value < 0
            ? typescript_1.default.factory.createPrefixUnaryExpression(typescript_1.default.SyntaxKind.MinusToken, typescript_1.default.factory.createNumericLiteral(Math.abs(value)))
            : typescript_1.default.factory.createNumericLiteral(value);
    };
    ExpressionFactory.bigint = function (value) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("BigInt"), undefined, [typescript_1.default.factory.createIdentifier(value.toString())]);
    };
    ExpressionFactory.isRequired = function (input) {
        return typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createIdentifier("undefined"), input);
    };
    ExpressionFactory.isArray = function (input) {
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Array.isArray"), undefined, [input]);
    };
    ExpressionFactory.isObject = function (options) {
        return function (input) {
            var conditions = [
                typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral("object"), typescript_1.default.factory.createTypeOfExpression(input)),
            ];
            if (options.checkNull === true)
                conditions.push(typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createNull(), input));
            if (options.checkArray === true)
                conditions.push(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createFalse(), typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Array.isArray"), undefined, [input])));
            return conditions.length === 1
                ? conditions[0]
                : conditions.reduce(function (x, y) { return typescript_1.default.factory.createLogicalAnd(x, y); });
        };
    };
    ExpressionFactory.isInstanceOf = function (type) {
        return function (input) {
            return typescript_1.default.factory.createBinaryExpression(input, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.InstanceOfKeyword), typescript_1.default.factory.createIdentifier(type));
        };
    };
    ExpressionFactory.coalesce = function (x) {
        return function (y) {
            return typescript_1.default.factory.createBinaryExpression(x, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionToken), y);
        };
    };
    ExpressionFactory.currying = function (target) { return function (parameters) {
        var e_1, _a;
        if (parameters.length === 0)
            return typescript_1.default.factory.createCallExpression(target, undefined, undefined);
        var prev = typescript_1.default.factory.createCallExpression(target, undefined, [parameters[0]]);
        try {
            for (var _b = __values(parameters.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var param = _c.value;
                prev = typescript_1.default.factory.createCallExpression(prev, undefined, [param]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return prev;
    }; };
    ExpressionFactory.selfCall = function (body) {
        return typescript_1.default.isCallExpression(body)
            ? body
            : typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, body)), undefined, undefined);
    };
    ExpressionFactory.getEscapedText = function (printer) {
        return function (input) {
            return printer.printNode(typescript_1.default.EmitHint.Expression, input, input.getSourceFile());
        };
    };
    ExpressionFactory.transpile = function (context) { return function (script) {
        var file = typescript_1.default.createSourceFile("".concat(RandomGenerator_1.RandomGenerator.uuid(), ".ts"), script, typescript_1.default.ScriptTarget.ESNext, true, typescript_1.default.ScriptKind.TS);
        var statement = file.statements[0];
        if (statement === undefined)
            throw new ReferenceError("Error on ExpressionFactory.transpile(): no statement exists.");
        else if (!typescript_1.default.isExpressionStatement(statement))
            throw new TypeError("Error on ExpressionFactory.transpile(): statement is not an expression statement.");
        return function (input) {
            var visitor = function (node) {
                if (typescript_1.default.isIdentifier(node) && node.text === "$input")
                    return input;
                return typescript_1.default.visitEachChild(typescript_1.default.factory.cloneNode(node), visitor, context);
            };
            return visitor(statement.expression);
        };
    }; };
})(ExpressionFactory || (exports.ExpressionFactory = ExpressionFactory = {}));
//# sourceMappingURL=ExpressionFactory.js.map