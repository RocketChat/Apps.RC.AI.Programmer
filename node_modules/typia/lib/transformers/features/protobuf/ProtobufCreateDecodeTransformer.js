"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateDecodeTransformer = void 0;
var ProtobufDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateDecodeTransformer;
(function (ProtobufCreateDecodeTransformer) {
    ProtobufCreateDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createDecode")(function (project) { return function (modulo) { return ProtobufDecodeProgrammer_1.ProtobufDecodeProgrammer.write(project)(modulo); }; });
})(ProtobufCreateDecodeTransformer || (exports.ProtobufCreateDecodeTransformer = ProtobufCreateDecodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateDecodeTransformer.js.map