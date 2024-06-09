"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeTransformer = void 0;
var typescript_1 = __importDefault(require("typescript"));
var CallExpressionTransformer_1 = require("./CallExpressionTransformer");
var NodeTransformer;
(function (NodeTransformer) {
    NodeTransformer.transform = function (project) {
        return function (expression) {
            return typescript_1.default.isCallExpression(expression) && expression.parent
                ? CallExpressionTransformer_1.CallExpressionTransformer.transform(project)(expression)
                : expression;
        };
    };
})(NodeTransformer || (exports.NodeTransformer = NodeTransformer = {}));
//# sourceMappingURL=NodeTransformer.js.map