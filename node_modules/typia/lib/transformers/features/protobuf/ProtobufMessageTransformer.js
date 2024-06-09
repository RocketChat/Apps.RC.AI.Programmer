"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufMessageTransformer = void 0;
var ProtobufMessageProgrammer_1 = require("../../../programmers/protobuf/ProtobufMessageProgrammer");
var TransformerError_1 = require("../../TransformerError");
var ProtobufMessageTransformer;
(function (ProtobufMessageTransformer) {
    ProtobufMessageTransformer.transform = function (project) {
        return function (_modulo) {
            return function (expression) {
                // CHECK GENERIC ARGUMENT EXISTENCE
                if (!expression.typeArguments || !expression.typeArguments[0])
                    throw new TransformerError_1.TransformerError({
                        code: "typia.protobuf.message",
                        message: "generic argument is not specified.",
                    });
                // GET TYPE INFO
                var type = project.checker.getTypeFromTypeNode(expression.typeArguments[0]);
                if (type.isTypeParameter())
                    throw new TransformerError_1.TransformerError({
                        code: "tyipa.protobuf.message",
                        message: "non-specified generic argument.",
                    });
                // DO TRANSFORM
                return ProtobufMessageProgrammer_1.ProtobufMessageProgrammer.write(project)(type);
            };
        };
    };
})(ProtobufMessageTransformer || (exports.ProtobufMessageTransformer = ProtobufMessageTransformer = {}));
//# sourceMappingURL=ProtobufMessageTransformer.js.map