"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufIsEncodeTransformer = void 0;
var ProtobufIsEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufIsEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufIsEncodeTransformer;
(function (ProtobufIsEncodeTransformer) {
    ProtobufIsEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.isEncode")(function (project) { return function (modulo) { return ProtobufIsEncodeProgrammer_1.ProtobufIsEncodeProgrammer.write(project)(modulo); }; });
})(ProtobufIsEncodeTransformer || (exports.ProtobufIsEncodeTransformer = ProtobufIsEncodeTransformer = {}));
//# sourceMappingURL=ProtobufIsEncodeTransformer.js.map