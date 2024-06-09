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
exports.stringify_dynamic_properties = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var TemplateFactory_1 = require("../../factories/TemplateFactory");
var metadata_to_pattern_1 = require("./metadata_to_pattern");
/**
 * @internal
 */
var stringify_dynamic_properties = function (dynamic, regular) {
    var e_1, _a;
    var _b;
    // BASIC STATMEMENT, CHECK UNDEFINED
    var statements = [
        typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("undefined"), typescript_1.default.factory.createIdentifier("value")), typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createStringLiteral(""))),
    ];
    // PREPARE RETURN FUNCTION
    var output = function () {
        var mapped = typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.entries"), undefined, [typescript_1.default.factory.createIdentifier("input")]))("map"), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                IdentifierFactory_1.IdentifierFactory.parameter(typescript_1.default.factory.createArrayBindingPattern([
                    typescript_1.default.factory.createBindingElement(undefined, undefined, "key"),
                    typescript_1.default.factory.createBindingElement(undefined, undefined, "value"),
                ]), typescript_1.default.factory.createTypeReferenceNode("[string, any]")),
            ], undefined, undefined, typescript_1.default.factory.createBlock(statements)),
        ]);
        var filtered = typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(mapped)("filter"), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("str")], undefined, undefined, typescript_1.default.factory.createStrictInequality(typescript_1.default.factory.createStringLiteral(""), typescript_1.default.factory.createIdentifier("str"))),
        ]);
        return typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(filtered)("join"), undefined, [typescript_1.default.factory.createStringLiteral(",")]);
    };
    // WHEN REGULAR PROPERTY EXISTS
    if (regular.length)
        statements.push(typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createArrayLiteralExpression(regular.map(function (key) { return typescript_1.default.factory.createStringLiteral(key); })))("some"), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("regular")], undefined, undefined, typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createIdentifier("regular"), typescript_1.default.factory.createIdentifier("key"))),
        ]), typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createStringLiteral(""))));
    // ONLY STRING TYPED KEY EXISTS
    var simple = dynamic.length === 1 &&
        dynamic[0].key.size() === 1 &&
        ((_b = dynamic[0].key.atomics[0]) === null || _b === void 0 ? void 0 : _b.type) === "string";
    if (simple === true) {
        statements.push(stringify(dynamic[0]));
        return output();
    }
    try {
        // COMPOSITE TEMPLATE LITERAL TYPES
        for (var dynamic_1 = __values(dynamic), dynamic_1_1 = dynamic_1.next(); !dynamic_1_1.done; dynamic_1_1 = dynamic_1.next()) {
            var entry = dynamic_1_1.value;
            var condition = typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("RegExp(/".concat((0, metadata_to_pattern_1.metadata_to_pattern)(true)(entry.key), "/).test")), undefined, [typescript_1.default.factory.createIdentifier("key")]), stringify(entry));
            statements.push(condition);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (dynamic_1_1 && !dynamic_1_1.done && (_a = dynamic_1.return)) _a.call(dynamic_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    statements.push(typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createStringLiteral("")));
    return output();
};
exports.stringify_dynamic_properties = stringify_dynamic_properties;
/**
 * @internal
 */
var stringify = function (entry) {
    return typescript_1.default.factory.createReturnStatement(TemplateFactory_1.TemplateFactory.generate([
        typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("JSON.stringify"), [], [typescript_1.default.factory.createIdentifier("key")]),
        typescript_1.default.factory.createStringLiteral(":"),
        entry.expression,
    ]));
};
//# sourceMappingURL=stringify_dynamic_properties.js.map