"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateAssertStringifyTransformer = void 0;
var JsonAssertStringifyProgrammer_1 = require("../../../programmers/json/JsonAssertStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateAssertStringifyTransformer;
(function (JsonCreateAssertStringifyTransformer) {
    JsonCreateAssertStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createAssertStringify")(function (project) { return function (modulo) {
        return JsonAssertStringifyProgrammer_1.JsonAssertStringifyProgrammer.write(project)(modulo);
    }; });
})(JsonCreateAssertStringifyTransformer || (exports.JsonCreateAssertStringifyTransformer = JsonCreateAssertStringifyTransformer = {}));
//# sourceMappingURL=JsonCreateAssertStringifyTransformer.js.map