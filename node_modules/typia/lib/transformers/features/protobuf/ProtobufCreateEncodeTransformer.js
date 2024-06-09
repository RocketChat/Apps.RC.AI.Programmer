"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateEncodeTransformer = void 0;
var ProtobufEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateEncodeTransformer;
(function (ProtobufCreateEncodeTransformer) {
    ProtobufCreateEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createEncode")(function (project) { return function (modulo) { return ProtobufEncodeProgrammer_1.ProtobufEncodeProgrammer.write(project)(modulo); }; });
})(ProtobufCreateEncodeTransformer || (exports.ProtobufCreateEncodeTransformer = ProtobufCreateEncodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateEncodeTransformer.js.map