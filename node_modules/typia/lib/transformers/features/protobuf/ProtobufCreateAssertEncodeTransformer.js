"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateAssertEncodeTransformer = void 0;
var ProtobufAssertEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufAssertEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateAssertEncodeTransformer;
(function (ProtobufCreateAssertEncodeTransformer) {
    ProtobufCreateAssertEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createAssertEncode")(function (project) { return function (modulo) {
        return ProtobufAssertEncodeProgrammer_1.ProtobufAssertEncodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufCreateAssertEncodeTransformer || (exports.ProtobufCreateAssertEncodeTransformer = ProtobufCreateAssertEncodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateAssertEncodeTransformer.js.map