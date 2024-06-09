"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufIsDecodeTransformer = void 0;
var ProtobufIsDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufIsDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufIsDecodeTransformer;
(function (ProtobufIsDecodeTransformer) {
    ProtobufIsDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.isDecode")(function (project) { return function (modulo) { return ProtobufIsDecodeProgrammer_1.ProtobufIsDecodeProgrammer.write(project)(modulo); }; });
})(ProtobufIsDecodeTransformer || (exports.ProtobufIsDecodeTransformer = ProtobufIsDecodeTransformer = {}));
//# sourceMappingURL=ProtobufIsDecodeTransformer.js.map