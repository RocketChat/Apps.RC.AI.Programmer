"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateValidateEncodeTransformer = void 0;
var ProtobufValidateEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufValidateEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateValidateEncodeTransformer;
(function (ProtobufCreateValidateEncodeTransformer) {
    ProtobufCreateValidateEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createValidateEncode")(function (project) { return function (modulo) {
        return ProtobufValidateEncodeProgrammer_1.ProtobufValidateEncodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufCreateValidateEncodeTransformer || (exports.ProtobufCreateValidateEncodeTransformer = ProtobufCreateValidateEncodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateValidateEncodeTransformer.js.map