"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAssertParseTransformer = void 0;
var JsonAssertParseProgrammer_1 = require("../../../programmers/json/JsonAssertParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonAssertParseTransformer;
(function (JsonAssertParseTransformer) {
    JsonAssertParseTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.assertParse")(function (project) { return function (modulo) { return JsonAssertParseProgrammer_1.JsonAssertParseProgrammer.write(project)(modulo); }; });
})(JsonAssertParseTransformer || (exports.JsonAssertParseTransformer = JsonAssertParseTransformer = {}));
//# sourceMappingURL=JsonAssertParseTransformer.js.map