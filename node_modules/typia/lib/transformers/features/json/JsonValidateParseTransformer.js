"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonValidateParseTransformer = void 0;
var JsonValidateParseProgrammer_1 = require("../../../programmers/json/JsonValidateParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonValidateParseTransformer;
(function (JsonValidateParseTransformer) {
    JsonValidateParseTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.validatParse")(function (project) { return function (modulo) { return JsonValidateParseProgrammer_1.JsonValidateParseProgrammer.write(project)(modulo); }; });
})(JsonValidateParseTransformer || (exports.JsonValidateParseTransformer = JsonValidateParseTransformer = {}));
//# sourceMappingURL=JsonValidateParseTransformer.js.map