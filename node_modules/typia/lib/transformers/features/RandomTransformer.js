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
exports.RandomTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var RandomProgrammer_1 = require("../../programmers/RandomProgrammer");
var TransformerError_1 = require("../TransformerError");
var RandomTransformer;
(function (RandomTransformer) {
    RandomTransformer.transform = function (project) {
        return function (modulo) {
            return function (expression) {
                var _a;
                // CHECK GENERIC ARGUMENT EXISTENCE
                if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
                    throw new TransformerError_1.TransformerError({
                        code: "typia.".concat(modulo.getText()),
                        message: "generic argument is not specified.",
                    });
                // GET TYPE INFO
                var node = expression.typeArguments[0];
                var type = project.checker.getTypeFromTypeNode(node);
                if (type.isTypeParameter())
                    throw new TransformerError_1.TransformerError({
                        code: "typia.".concat(modulo.getText()),
                        message: "non-specified generic argument.",
                    });
                // DO TRANSFORM
                return typescript_1.default.factory.createCallExpression(RandomProgrammer_1.RandomProgrammer.write(__assign(__assign({}, project), { options: __assign(__assign({}, project.options), { functional: false, numeric: false }) }))(modulo)()(type, node.getFullText().trim()), undefined, expression.arguments.length ? [expression.arguments[0]] : undefined);
            };
        };
    };
})(RandomTransformer || (exports.RandomTransformer = RandomTransformer = {}));
//# sourceMappingURL=RandomTransformer.js.map