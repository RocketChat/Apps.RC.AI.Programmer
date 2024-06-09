"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufValidateEncodeTransformer = void 0;
var ProtobufValidateEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufValidateEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufValidateEncodeTransformer;
(function (ProtobufValidateEncodeTransformer) {
    ProtobufValidateEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.validateEncode")(function (project) { return function (modulo) {
        return ProtobufValidateEncodeProgrammer_1.ProtobufValidateEncodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufValidateEncodeTransformer || (exports.ProtobufValidateEncodeTransformer = ProtobufValidateEncodeTransformer = {}));
//# sourceMappingURL=ProtobufValidateEncodeTransformer.js.map