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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRandomTransformer = void 0;
var RandomProgrammer_1 = require("../../programmers/RandomProgrammer");
var TransformerError_1 = require("../TransformerError");
var CreateRandomTransformer;
(function (CreateRandomTransformer) {
    CreateRandomTransformer.transform = function (project) {
        return function (modulo) {
            return function (expression) {
                var _a, _b;
                // CHECK GENERIC ARGUMENT EXISTENCE
                if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
                    throw new TransformerError_1.TransformerError({
                        code: "typia.createRandom",
                        message: "generic argument is not specified.",
                    });
                // GET TYPE INFO
                var node = expression.typeArguments[0];
                var type = project.checker.getTypeFromTypeNode(node);
                if (type.isTypeParameter())
                    throw new TransformerError_1.TransformerError({
                        code: "typia.createRandom",
                        message: "non-specified generic argument.",
                    });
                // DO TRANSFORM
                return RandomProgrammer_1.RandomProgrammer.write(__assign(__assign({}, project), { options: __assign(__assign({}, project.options), { functional: false, numeric: false }) }))(modulo)((_b = expression.arguments) === null || _b === void 0 ? void 0 : _b[0])(type, node.getFullText().trim());
            };
        };
    };
})(CreateRandomTransformer || (exports.CreateRandomTransformer = CreateRandomTransformer = {}));
//# sourceMappingURL=CreateRandomTransformer.js.map