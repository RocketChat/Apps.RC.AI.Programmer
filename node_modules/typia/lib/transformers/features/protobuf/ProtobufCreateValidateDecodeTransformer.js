"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateValidateDecodeTransformer = void 0;
var ProtobufValidateDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufValidateDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateValidateDecodeTransformer;
(function (ProtobufCreateValidateDecodeTransformer) {
    ProtobufCreateValidateDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createValidateDecode")(function (project) { return function (modulo) {
        return ProtobufValidateDecodeProgrammer_1.ProtobufValidateDecodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufCreateValidateDecodeTransformer || (exports.ProtobufCreateValidateDecodeTransformer = ProtobufCreateValidateDecodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateValidateDecodeTransformer.js.map