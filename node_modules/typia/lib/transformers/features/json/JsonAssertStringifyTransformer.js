"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAssertStringifyTransformer = void 0;
var JsonAssertStringifyProgrammer_1 = require("../../../programmers/json/JsonAssertStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonAssertStringifyTransformer;
(function (JsonAssertStringifyTransformer) {
    JsonAssertStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.assertStringify")(function (project) { return function (modulo) {
        return JsonAssertStringifyProgrammer_1.JsonAssertStringifyProgrammer.write(project)(modulo);
    }; });
})(JsonAssertStringifyTransformer || (exports.JsonAssertStringifyTransformer = JsonAssertStringifyTransformer = {}));
//# sourceMappingURL=JsonAssertStringifyTransformer.js.map