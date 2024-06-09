"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateValidateParseTransformer = void 0;
var JsonValidateParseProgrammer_1 = require("../../../programmers/json/JsonValidateParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateValidateParseTransformer;
(function (JsonCreateValidateParseTransformer) {
    JsonCreateValidateParseTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createValidateParse")(function (project) { return function (modulo) { return JsonValidateParseProgrammer_1.JsonValidateParseProgrammer.write(project)(modulo); }; });
})(JsonCreateValidateParseTransformer || (exports.JsonCreateValidateParseTransformer = JsonCreateValidateParseTransformer = {}));
//# sourceMappingURL=JsonCreateValidateParseTransformer.js.map