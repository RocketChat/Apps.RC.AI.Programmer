"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateAssertParseTransformer = void 0;
var JsonAssertParseProgrammer_1 = require("../../../programmers/json/JsonAssertParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateAssertParseTransformer;
(function (JsonCreateAssertParseTransformer) {
    JsonCreateAssertParseTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createAssertParse")(function (project) { return function (modulo) { return JsonAssertParseProgrammer_1.JsonAssertParseProgrammer.write(project)(modulo); }; });
})(JsonCreateAssertParseTransformer || (exports.JsonCreateAssertParseTransformer = JsonCreateAssertParseTransformer = {}));
//# sourceMappingURL=JsonCreateAssertParseTransformer.js.map