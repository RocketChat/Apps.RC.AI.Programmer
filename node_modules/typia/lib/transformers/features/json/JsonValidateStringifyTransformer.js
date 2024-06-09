"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonValidateStringifyTransformer = void 0;
var JsonValidateStringifyProgrammer_1 = require("../../../programmers/json/JsonValidateStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonValidateStringifyTransformer;
(function (JsonValidateStringifyTransformer) {
    JsonValidateStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.validatStringify")(function (project) { return function (modulo) {
        return JsonValidateStringifyProgrammer_1.JsonValidateStringifyProgrammer.write(project)(modulo);
    }; });
})(JsonValidateStringifyTransformer || (exports.JsonValidateStringifyTransformer = JsonValidateStringifyTransformer = {}));
//# sourceMappingURL=JsonValidateStringifyTransformer.js.map