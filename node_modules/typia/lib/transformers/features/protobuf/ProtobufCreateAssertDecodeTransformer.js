"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufCreateAssertDecodeTransformer = void 0;
var ProtobufAssertDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufAssertDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufCreateAssertDecodeTransformer;
(function (ProtobufCreateAssertDecodeTransformer) {
    ProtobufCreateAssertDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.factory("protobuf.createAssertDecode")(function (project) { return function (modulo) {
        return ProtobufAssertDecodeProgrammer_1.ProtobufAssertDecodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufCreateAssertDecodeTransformer || (exports.ProtobufCreateAssertDecodeTransformer = ProtobufCreateAssertDecodeTransformer = {}));
//# sourceMappingURL=ProtobufCreateAssertDecodeTransformer.js.map