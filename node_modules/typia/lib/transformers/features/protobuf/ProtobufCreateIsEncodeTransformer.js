"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateIsEncodeTransformer = void 0;
var ProtobufIsEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufIsEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateIsEncodeTransformer;
(function (ProtobufCreateIsEncodeTransformer) {
    ProtobufCreateIsEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createIsEncode")(function (project) { return function (modulo) { return ProtobufIsEncodeProgrammer_1.ProtobufIsEncodeProgrammer.write(project)(modulo); }; });
})(ProtobufCreateIsEncodeTransformer || (exports.ProtobufCreateIsEncodeTransformer = ProtobufCreateIsEncodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateIsEncodeTransformer.js.map