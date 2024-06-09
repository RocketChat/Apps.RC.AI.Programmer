"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_union_array_like = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var StatementFactory_1 = require("../../factories/StatementFactory");
var TypeFactory_1 = require("../../factories/TypeFactory");
var MetadataArray_1 = require("../../schemas/metadata/MetadataArray");
var MetadataArrayType_1 = require("../../schemas/metadata/MetadataArrayType");
var MetadataTuple_1 = require("../../schemas/metadata/MetadataTuple");
/**
 * @internal
 */
var check_union_array_like = function (accessor) {
    return function (props) {
        return function (parameters) {
            return function (input, origins, explore) {
                // ONLY ONE TYPE
                var targets = origins.map(accessor.transform);
                if (targets.length === 1)
                    return typescript_1.default.factory.createArrowFunction(undefined, undefined, parameters, undefined, undefined, props.decoder(accessor.array(input), targets[0], explore));
                var array = typescript_1.default.factory.createIdentifier("array");
                var top = typescript_1.default.factory.createIdentifier("top");
                var statements = [];
                var tupleList = targets.filter(function (t) { return t instanceof MetadataTuple_1.MetadataTuple; });
                var arrayList = targets.filter(function (t) { return t instanceof MetadataArray_1.MetadataArray; });
                var predicate = function (meta) {
                    return typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createArrayLiteralExpression([
                        typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                            IdentifierFactory_1.IdentifierFactory.parameter("top", meta instanceof MetadataArrayType_1.MetadataArrayType
                                ? TypeFactory_1.TypeFactory.keyword("any")
                                : typescript_1.default.factory.createTypeReferenceNode("any[]")),
                        ], TypeFactory_1.TypeFactory.keyword("any"), undefined, props.checker(typescript_1.default.factory.createIdentifier("top"), accessor.element(meta), __assign(__assign({}, explore), { tracable: false, postfix: meta instanceof MetadataArrayType_1.MetadataArrayType ? "\"[0]\"" : "" }), array)),
                        typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                            IdentifierFactory_1.IdentifierFactory.parameter("entire", typescript_1.default.factory.createTypeReferenceNode("any[]")),
                        ], TypeFactory_1.TypeFactory.keyword("any"), undefined, props.decoder(typescript_1.default.factory.createIdentifier("entire"), meta, __assign(__assign({}, explore), { tracable: true }))),
                    ], true), typescript_1.default.factory.createTypeReferenceNode("const"));
                };
                var iterate = function (init) {
                    return function (from) {
                        return function (stmt) {
                            return typescript_1.default.factory.createForOfStatement(undefined, typescript_1.default.factory.createVariableDeclarationList([typescript_1.default.factory.createVariableDeclaration(init)], typescript_1.default.NodeFlags.Const), from, stmt);
                        };
                    };
                };
                if (tupleList.length)
                    statements.push(StatementFactory_1.StatementFactory.constant("array", accessor.array(input)), StatementFactory_1.StatementFactory.constant("tuplePredicators", typescript_1.default.factory.createArrayLiteralExpression(tupleList.map(function (x) { return predicate(x); }), true)), iterate("pred")(typescript_1.default.factory.createIdentifier("tuplePredicators"))(typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("pred[0]"), undefined, [array]), typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("pred[1]"), undefined, [array])))));
                if (arrayList.length) {
                    if (tupleList.length === 0)
                        statements.push(StatementFactory_1.StatementFactory.constant("array", accessor.array(input)));
                    statements.push(StatementFactory_1.StatementFactory.constant("top", accessor.front(input)), typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(0), accessor.size(input)), typescript_1.default.isReturnStatement(props.empty)
                        ? props.empty
                        : typescript_1.default.factory.createReturnStatement(props.empty)), StatementFactory_1.StatementFactory.constant("arrayPredicators", typescript_1.default.factory.createArrayLiteralExpression(arrayList.map(function (x) { return predicate(x); }), true)), StatementFactory_1.StatementFactory.constant("passed", typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createIdentifier("arrayPredicators"))("filter"), undefined, [
                        typescript_1.default.factory.createArrowFunction(undefined, undefined, [IdentifierFactory_1.IdentifierFactory.parameter("pred")], undefined, undefined, typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("pred[0]"), undefined, [top])),
                    ])), typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createStrictEquality(ExpressionFactory_1.ExpressionFactory.number(1), typescript_1.default.factory.createIdentifier("passed.length")), typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createElementAccessExpression(typescript_1.default.factory.createNonNullExpression(typescript_1.default.factory.createIdentifier("passed[0]")), 1), undefined, [array])), typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createLessThan(ExpressionFactory_1.ExpressionFactory.number(1), typescript_1.default.factory.createIdentifier("passed.length")), iterate("pred")(typescript_1.default.factory.createIdentifier("passed"))(typescript_1.default.factory.createIfStatement(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(array)("every"), undefined, [
                        typescript_1.default.factory.createArrowFunction(undefined, undefined, [
                            IdentifierFactory_1.IdentifierFactory.parameter("value", TypeFactory_1.TypeFactory.keyword("any")),
                        ], undefined, undefined, typescript_1.default.factory.createStrictEquality(props.success, typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("pred[0]"), undefined, [typescript_1.default.factory.createIdentifier("value")]))),
                    ]), typescript_1.default.factory.createReturnStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier("pred[1]"), undefined, [typescript_1.default.factory.createIdentifier("array")])))))));
                }
                statements.push(props.failure(input, "(".concat(targets
                    .map(function (t) { return accessor.name(t, accessor.element(t)); })
                    .join(" | "), ")"), explore));
                return typescript_1.default.factory.createArrowFunction(undefined, undefined, parameters, undefined, undefined, typescript_1.default.factory.createBlock(statements, true));
            };
        };
    };
};
exports.check_union_array_like = check_union_array_like;
//# sourceMappingURL=check_union_array_like.js.map