"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufAssertEncodeTransformer = void 0;
var ProtobufAssertEncodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufAssertEncodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufAssertEncodeTransformer;
(function (ProtobufAssertEncodeTransformer) {
    ProtobufAssertEncodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.assertEncode")(function (project) { return function (modulo) {
        return ProtobufAssertEncodeProgrammer_1.ProtobufAssertEncodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufAssertEncodeTransformer || (exports.ProtobufAssertEncodeTransformer = ProtobufAssertEncodeTransformer = {}));
//# sourceMappingURL=ProtobufAssertEncodeTransformer.js.map