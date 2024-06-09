"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateIsParseTransformer = void 0;
var JsonIsParseProgrammer_1 = require("../../../programmers/json/JsonIsParseProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateIsParseTransformer;
(function (JsonCreateIsParseTransformer) {
    JsonCreateIsParseTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createIsParse")(function (project) { return function (modulo) { return JsonIsParseProgrammer_1.JsonIsParseProgrammer.write(project)(modulo); }; });
})(JsonCreateIsParseTransformer || (exports.JsonCreateIsParseTransformer = JsonCreateIsParseTransformer = {}));
//# sourceMappingURL=JsonCreateIsParseTransformer.js.map