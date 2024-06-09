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
exports.UnionExplorer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var ExpressionFactory_1 = require("../../factories/ExpressionFactory");
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var Metadata_1 = require("../../schemas/metadata/Metadata");
var MetadataArray_1 = require("../../schemas/metadata/MetadataArray");
var MetadataArrayType_1 = require("../../schemas/metadata/MetadataArrayType");
var MetadataTuple_1 = require("../../schemas/metadata/MetadataTuple");
var MetadataTupleType_1 = require("../../schemas/metadata/MetadataTupleType");
var check_union_array_like_1 = require("../internal/check_union_array_like");
var UnionPredicator_1 = require("./UnionPredicator");
var UnionExplorer;
(function (UnionExplorer) {
    /* -----------------------------------------------------------
          OBJECT
      ----------------------------------------------------------- */
    UnionExplorer.object = function (config, level) {
        if (level === void 0) { level = 0; }
        return function (input, targets, explore) {
            // BREAKER
            if (targets.length === 1)
                return config.objector.decoder()(input, targets[0], explore);
            var expected = "(".concat(targets.map(function (t) { return t.name; }).join(" | "), ")");
            // POSSIBLE TO SPECIALIZE?
            var specList = UnionPredicator_1.UnionPredicator.object(targets);
            if (specList.length === 0) {
                var condition_1 = config.objector.unionizer(input, targets, __assign(__assign({}, explore), { tracable: false }));
                return config.objector.full
                    ? config.objector.full(condition_1)(input, expected, explore)
                    : condition_1;
            }
            var remained = targets.filter(function (t) { return specList.find(function (s) { return s.object === t; }) === undefined; });
            // DO SPECIALIZE
            var condition = specList
                .filter(function (spec) { return spec.property.key.getSoleLiteral() !== null; })
                .map(function (spec, i, array) {
                var key = spec.property.key.getSoleLiteral();
                var accessor = IdentifierFactory_1.IdentifierFactory.access(input)(key);
                var pred = spec.neighbour
                    ? config.objector.checker()(accessor, spec.property.value, __assign(__assign({}, explore), { tracable: false, postfix: IdentifierFactory_1.IdentifierFactory.postfix(key) }))
                    : (config.objector.required || (function (exp) { return exp; }))(ExpressionFactory_1.ExpressionFactory.isRequired(accessor));
                return typescript_1.default.factory.createIfStatement((config.objector.is || (function (exp) { return exp; }))(pred), typescript_1.default.factory.createReturnStatement(config.objector.decoder()(input, spec.object, explore)), i === array.length - 1
                    ? remained.length
                        ? typescript_1.default.factory.createReturnStatement(UnionExplorer.object(config, level + 1)(input, remained, explore))
                        : config.objector.failure(input, expected, explore)
                    : undefined);
            })
                .reverse()
                .reduce(function (a, b) {
                return typescript_1.default.factory.createIfStatement(b.expression, b.thenStatement, a);
            });
            // RETURNS WITH CONDITIONS
            return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, undefined, typescript_1.default.factory.createBlock([condition], true)), undefined, undefined);
        };
    };
    /* -----------------------------------------------------------
          ARRAY LIKE
      ----------------------------------------------------------- */
    UnionExplorer.tuple = function (props) {
        return (0, check_union_array_like_1.check_union_array_like)({
            transform: function (x) { return x; },
            element: function (x) { return x; },
            size: null,
            front: function (input) { return input; },
            array: function (input) { return input; },
            name: function (t) { return t.type.name; },
        })(props);
    };
    UnionExplorer.array = function (props) {
        return (0, check_union_array_like_1.check_union_array_like)({
            transform: function (x) { return x; },
            element: function (x) { return x.type.value; },
            size: function (input) { return IdentifierFactory_1.IdentifierFactory.access(input)("length"); },
            front: function (input) { return typescript_1.default.factory.createElementAccessExpression(input, 0); },
            array: function (input) { return input; },
            name: function (t) { return t.type.name; },
        })(props);
    };
    UnionExplorer.array_or_tuple = function (props) {
        return (0, check_union_array_like_1.check_union_array_like)({
            transform: function (x) { return x; },
            element: function (x) { return (x instanceof MetadataArray_1.MetadataArray ? x.type.value : x); },
            size: function (input) { return IdentifierFactory_1.IdentifierFactory.access(input)("length"); },
            front: function (input) { return typescript_1.default.factory.createElementAccessExpression(input, 0); },
            array: function (input) { return input; },
            name: function (m) { return m.type.name; },
        })(props);
    };
    UnionExplorer.set = function (props) {
        return (0, check_union_array_like_1.check_union_array_like)({
            transform: function (value) {
                return MetadataArray_1.MetadataArray.create({
                    tags: [],
                    type: MetadataArrayType_1.MetadataArrayType.create({
                        name: "Set<".concat(value.getName(), ">"),
                        index: null,
                        recursive: false,
                        nullables: [],
                        value: value,
                    }),
                });
            },
            element: function (array) { return array.type.value; },
            size: function (input) { return IdentifierFactory_1.IdentifierFactory.access(input)("size"); },
            front: function (input) {
                return IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("values"), undefined, undefined))("next"), undefined, undefined))("value");
            },
            array: function (input) {
                return typescript_1.default.factory.createArrayLiteralExpression([typescript_1.default.factory.createSpreadElement(input)], false);
            },
            name: function (_m, e) { return "Set<".concat(e.getName(), ">"); },
        })(props);
    };
    UnionExplorer.map = function (props) {
        return (0, check_union_array_like_1.check_union_array_like)({
            element: function (array) {
                return array.type.value.tuples[0].type.elements;
            },
            size: function (input) { return IdentifierFactory_1.IdentifierFactory.access(input)("size"); },
            front: function (input) {
                return IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(typescript_1.default.factory.createCallExpression(IdentifierFactory_1.IdentifierFactory.access(input)("entries"), undefined, undefined))("next"), undefined, undefined))("value");
            },
            array: function (input) {
                return typescript_1.default.factory.createArrayLiteralExpression([typescript_1.default.factory.createSpreadElement(input)], false);
            },
            name: function (_m, _a) {
                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                return "Map<".concat(k.getName(), ", ").concat(v.getName(), ">");
            },
            transform: function (m) {
                return MetadataArray_1.MetadataArray.create({
                    tags: [],
                    type: MetadataArrayType_1.MetadataArrayType.create({
                        name: "Map<".concat(m.key.getName(), ", ").concat(m.value.getName(), ">"),
                        index: null,
                        recursive: false,
                        nullables: [],
                        value: Metadata_1.Metadata.create(__assign(__assign({}, Metadata_1.Metadata.initialize()), { tuples: [
                                (function () {
                                    var tuple = MetadataTuple_1.MetadataTuple.create({
                                        tags: [],
                                        type: MetadataTupleType_1.MetadataTupleType.create({
                                            name: "[".concat(m.key.getName(), ", ").concat(m.value.getName(), "]"),
                                            index: null,
                                            recursive: false,
                                            nullables: [],
                                            elements: [m.key, m.value],
                                        }),
                                    });
                                    tuple.type.of_map = true;
                                    return tuple;
                                })(),
                            ] })),
                    }),
                });
            },
        })(props);
    };
})(UnionExplorer || (exports.UnionExplorer = UnionExplorer = {}));
//# sourceMappingURL=UnionExplorer.js.map