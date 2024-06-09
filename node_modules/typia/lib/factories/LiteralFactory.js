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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("./ExpressionFactory");
var IdentifierFactory_1 = require("./IdentifierFactory");
var LiteralFactory;
(function (LiteralFactory) {
    LiteralFactory.generate = function (input) {
        if (input === null)
            return typescript_1.default.factory.createNull();
        else if (typescript_1.default.isIdentifier(input))
            return input;
        else if (input instanceof Array)
            return generate_array(input);
        else if (typeof input === "object")
            return generate_object(input);
        else if (typeof input === "string")
            return generate_string(input);
        else if (typeof input === "boolean")
            return generate_value(input);
        else if (typeof input === "number")
            return generate_value(input);
        else if (typeof input === "bigint")
            return generate_bigint(input);
        // unreachable code
        else if (typeof input === "function")
            return typescript_1.default.factory.createIdentifier("undefined");
        else
            throw new TypeError("Error on LiteralFactory.generate(): unknown type.");
    };
    var generate_object = function (obj) {
        return typescript_1.default.factory.createObjectLiteralExpression(Object.entries(obj)
            .filter(function (tuple) { return tuple[1] !== undefined; })
            .map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return typescript_1.default.factory.createPropertyAssignment(IdentifierFactory_1.IdentifierFactory.identifier(key), LiteralFactory.generate(value));
        }), true);
    };
    var generate_array = function (array) {
        return typescript_1.default.factory.createArrayLiteralExpression(array.map(LiteralFactory.generate), true);
    };
    var generate_value = function (value) {
        return typescript_1.default.factory.createIdentifier(value.toString());
    };
    var generate_bigint = function (value) {
        return ExpressionFactory_1.ExpressionFactory.bigint(value);
    };
    var generate_string = function (value) {
        return typescript_1.default.factory.createStringLiteral(value);
    };
})(LiteralFactory || (exports.LiteralFactory = LiteralFactory = {}));
//# sourceMappingURL=LiteralFactory.js.map