"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feature_object_entries = void 0;
var typescript_1 = __importDefault(require("typescript"));
var IdentifierFactory_1 = require("../../factories/IdentifierFactory");
var Escaper_1 = require("../../utils/Escaper");
/**
 * @internal
 */
var feature_object_entries = function (config) {
    return function (importer) {
        return function (obj) {
            return function (input, from) {
                if (from === void 0) { from = "object"; }
                return obj.properties.map(function (prop) {
                    var sole = prop.key.getSoleLiteral();
                    var propInput = sole === null
                        ? typescript_1.default.factory.createIdentifier("value")
                        : Escaper_1.Escaper.variable(sole)
                            ? typescript_1.default.factory.createPropertyAccessExpression(input, typescript_1.default.factory.createIdentifier(sole))
                            : typescript_1.default.factory.createElementAccessExpression(input, typescript_1.default.factory.createStringLiteral(sole));
                    return {
                        input: propInput,
                        key: prop.key,
                        meta: prop.value,
                        expression: config.decoder()(propInput, prop.value, {
                            tracable: config.path || config.trace,
                            source: "function",
                            from: from,
                            postfix: config.trace
                                ? sole !== null
                                    ? IdentifierFactory_1.IdentifierFactory.postfix(sole)
                                    : (function () {
                                        importer.use("join");
                                        return "$join(key)";
                                    })()
                                : "",
                        }),
                    };
                });
            };
        };
    };
};
exports.feature_object_entries = feature_object_entries;
//# sourceMappingURL=feature_object_entries.js.map