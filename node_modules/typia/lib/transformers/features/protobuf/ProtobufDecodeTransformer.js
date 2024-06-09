"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufDecodeTransformer = void 0;
var ProtobufDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufDecodeTransformer;
(function (ProtobufDecodeTransformer) {
    ProtobufDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.decode")(function (project) { return function (modulo) { return ProtobufDecodeProgrammer_1.ProtobufDecodeProgrammer.write(project)(modulo); }; });
})(ProtobufDecodeTransformer || (exports.ProtobufDecodeTransformer = ProtobufDecodeTransformer = {}));
//# sourceMappingURL=ProtobufDecodeTransformer.js.map