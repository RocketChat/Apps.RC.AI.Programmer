"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscLiteralsTransformer = void 0;
var MiscLiteralsProgrammer_1 = require("../../../programmers/misc/MiscLiteralsProgrammer");
var TransformerError_1 = require("../../TransformerError");
var MiscLiteralsTransformer;
(function (MiscLiteralsTransformer) {
    MiscLiteralsTransformer.transform = function (project) {
        return function (expression) {
            var _a;
            // CHECK GENERIC ARGUMENT EXISTENCE
            if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a[0]))
                throw new TransformerError_1.TransformerError({
                    code: "typia.misc.literals",
                    message: "generic argument is not specified.",
                });
            // GET TYPE INFO
            var node = expression.typeArguments[0];
            var type = project.checker.getTypeFromTypeNode(node);
            if (type.isTypeParameter())
                throw new TransformerError_1.TransformerError({
                    code: "typia.misc.literals",
                    message: "non-specified generic argument.",
                });
            // DO TRANSFORM
            return MiscLiteralsProgrammer_1.MiscLiteralsProgrammer.write(project)(type);
        };
    };
})(MiscLiteralsTransformer || (exports.MiscLiteralsTransformer = MiscLiteralsTransformer = {}));
//# sourceMappingURL=MiscLiteralsTransformer.js.map