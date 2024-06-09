"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonIsParseTransformer = void 0;
var JsonIsParseProgrammer_1 = require("../../../programmers/json/JsonIsParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonIsParseTransformer;
(function (JsonIsParseTransformer) {
    JsonIsParseTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.isParse")(function (project) { return function (modulo) { return JsonIsParseProgrammer_1.JsonIsParseProgrammer.write(project)(modulo); }; });
})(JsonIsParseTransformer || (exports.JsonIsParseTransformer = JsonIsParseTransformer = {}));
//# sourceMappingURL=JsonIsParseTransformer.js.map