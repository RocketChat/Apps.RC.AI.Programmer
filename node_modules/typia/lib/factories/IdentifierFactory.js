"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierFactory = void 0;
var typescript_1 = __importDefault(require("typescript"));
var Escaper_1 = require("../utils/Escaper");
var TypeFactory_1 = require("./TypeFactory");
var IdentifierFactory;
(function (IdentifierFactory) {
    IdentifierFactory.identifier = function (name) {
        return Escaper_1.Escaper.variable(name)
            ? typescript_1.default.factory.createIdentifier(name)
            : typescript_1.default.factory.createStringLiteral(name);
    };
    IdentifierFactory.access = function (target) { return function (property) {
        var postfix = IdentifierFactory.identifier(property);
        return typescript_1.default.isStringLiteral(postfix)
            ? typescript_1.default.factory.createElementAccessExpression(target, postfix)
            : typescript_1.default.factory.createPropertyAccessExpression(target, postfix);
    }; };
    IdentifierFactory.getName = function (input) {
        var _a;
        var value = (_a = input.escapedText) === null || _a === void 0 ? void 0 : _a.toString();
        if (typeof value === "string")
            return value;
        if (typescript_1.default.isPropertyAccessExpression(input))
            return "".concat(IdentifierFactory.getName(input.expression), ".").concat(input.name.escapedText.toString());
        else if (typescript_1.default.isElementAccessExpression(input))
            return "".concat(IdentifierFactory.getName(input.expression), "[").concat(IdentifierFactory.getName(input.argumentExpression), "]");
        return "uknown";
    };
    IdentifierFactory.postfix = function (str) {
        return Escaper_1.Escaper.variable(str)
            ? "\".".concat(str, "\"")
            : "\"[".concat(JSON.stringify(str).split('"').join('\\"'), "]\"");
    };
    IdentifierFactory.parameter = function (name, type, init) {
        // instead of ts.version >= "4.8"
        if (typescript_1.default.getDecorators !== undefined)
            return typescript_1.default.factory.createParameterDeclaration(undefined, undefined, name, (init === null || init === void 0 ? void 0 : init.kind) === typescript_1.default.SyntaxKind.QuestionToken
                ? typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken)
                : undefined, type !== null && type !== void 0 ? type : TypeFactory_1.TypeFactory.keyword("any"), init && init.kind !== typescript_1.default.SyntaxKind.QuestionToken ? init : undefined);
        // eslint-disable-next-line
        return typescript_1.default.factory.createParameterDeclaration(undefined, undefined, undefined, name, (init === null || init === void 0 ? void 0 : init.kind) === typescript_1.default.SyntaxKind.QuestionToken
            ? typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken)
            : undefined, type, init && init.kind !== typescript_1.default.SyntaxKind.QuestionToken ? init : undefined);
    };
})(IdentifierFactory || (exports.IdentifierFactory = IdentifierFactory = {}));
//# sourceMappingURL=IdentifierFactory.js.map