"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateIsDecodeTransformer = void 0;
var ProtobufIsDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufIsDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateIsDecodeTransformer;
(function (ProtobufCreateIsDecodeTransformer) {
    ProtobufCreateIsDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createIsDecode")(function (project) { return function (modulo) { return ProtobufIsDecodeProgrammer_1.ProtobufIsDecodeProgrammer.write(project)(modulo); }; });
})(ProtobufCreateIsDecodeTransformer || (exports.ProtobufCreateIsDecodeTransformer = ProtobufCreateIsDecodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateIsDecodeTransformer.js.map