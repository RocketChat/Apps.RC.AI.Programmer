"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufValidateDecodeTransformer = void 0;
var ProtobufValidateDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufValidateDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufValidateDecodeTransformer;
(function (ProtobufValidateDecodeTransformer) {
    ProtobufValidateDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.validateDecode")(function (project) { return function (modulo) {
        return ProtobufValidateDecodeProgrammer_1.ProtobufValidateDecodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufValidateDecodeTransformer || (exports.ProtobufValidateDecodeTransformer = ProtobufValidateDecodeTransformer = {}));
//# sourceMappingURL=ProtobufValidateDecodeTransformer.js.map