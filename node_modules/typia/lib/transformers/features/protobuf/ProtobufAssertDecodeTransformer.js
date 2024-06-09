"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtobufAssertDecodeTransformer = void 0;
var ProtobufAssertDecodeProgrammer_1 = require("../../../programmers/protobuf/ProtobufAssertDecodeProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var ProtobufAssertDecodeTransformer;
(function (ProtobufAssertDecodeTransformer) {
    ProtobufAssertDecodeTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("protobuf.assertDecode")(function (project) { return function (modulo) {
        return ProtobufAssertDecodeProgrammer_1.ProtobufAssertDecodeProgrammer.write(project)(modulo);
    }; });
})(ProtobufAssertDecodeTransformer || (exports.ProtobufAssertDecodeTransformer = ProtobufAssertDecodeTransformer = {}));
//# sourceMappingURL=ProtobufAssertDecodeTransformer.js.map