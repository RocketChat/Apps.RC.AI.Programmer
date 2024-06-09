"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateValidateStringifyTransformer = void 0;
var JsonValidateStringifyProgrammer_1 = require("../../../programmers/json/JsonValidateStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateValidateStringifyTransformer;
(function (JsonCreateValidateStringifyTransformer) {
    JsonCreateValidateStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createValidateStringify")(function (project) { return function (modulo) {
        return JsonValidateStringifyProgrammer_1.JsonValidateStringifyProgrammer.write(project)(modulo);
    }; });
})(JsonCreateValidateStringifyTransformer || (exports.JsonCreateValidateStringifyTransformer = JsonCreateValidateStringifyTransformer = {}));
//# sourceMappingURL=JsonCreateValidateStringifyProgrammer.js.map