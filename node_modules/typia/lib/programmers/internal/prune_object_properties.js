"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prune_object_properties = void 0;
var typescript_1 = __importDefault(require("typescript"));
var StatementFactory_1 = require("../../factories/StatementFactory");
var metadata_to_pattern_1 = require("./metadata_to_pattern");
/**
 * @internal
 */
var prune_object_properties = function (obj) {
    var input = typescript_1.default.factory.createIdentifier("input");
    var key = typescript_1.default.factory.createIdentifier("key");
    var condition = obj.properties.map(function (prop) {
        var name = prop.key.getSoleLiteral();
        if (name !== null)
            return typescript_1.default.factory.createStrictEquality(typescript_1.default.factory.createStringLiteral(name), typescript_1.default.factory.createIdentifier("key"));
        return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("RegExp(/".concat((0, metadata_to_pattern_1.metadata_to_pattern)(true)(prop.key), "/).test")), undefined, [key]);
    });
    var statements = [];
    if (condition.length)
        statements.push(typescript_1.default.factory.createIfStatement(condition.reduce(function (a, b) { return typescript_1.default.factory.createLogicalOr(a, b); }), typescript_1.default.factory.createContinueStatement()));
    statements.push(typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createDeleteExpression(typescript_1.default.factory.createElementAccessExpression(input, key))));
    return typescript_1.default.factory.createForOfStatement(undefined, StatementFactory_1.StatementFactory.constant("key").declarationList, typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("Object.keys"), undefined, [input]), statements.length === 1
        ? statements[0]
        : typescript_1.default.factory.createBlock(statements, true));
};
exports.prune_object_properties = prune_object_properties;
//# sourceMappingURL=prune_object_properties.js.map