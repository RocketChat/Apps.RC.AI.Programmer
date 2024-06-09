"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufEncodeTransformer = void 0;
var ProtobufEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufEncodeTransformer;
(function (ProtobufEncodeTransformer) {
    ProtobufEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.encode")(function (project) { return function (modulo) { return ProtobufEncodeProgrammer_1.ProtobufEncodeProgrammer.write(project)(modulo); }; });
})(ProtobufEncodeTransformer || (exports.ProtobufEncodeTransformer = ProtobufEncodeTransformer = {}));
//# sourceMappingURL=ProtobufEncodeTransformer.js.map