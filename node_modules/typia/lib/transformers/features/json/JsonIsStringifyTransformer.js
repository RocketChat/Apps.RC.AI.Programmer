"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonIsStringifyTransformer = void 0;
var JsonIsStringifyProgrammer_1 = require("../../../programmers/json/JsonIsStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonIsStringifyTransformer;
(function (JsonIsStringifyTransformer) {
    JsonIsStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.isStringify")(function (project) { return function (modulo) { return JsonIsStringifyProgrammer_1.JsonIsStringifyProgrammer.write(project)(modulo); }; });
})(JsonIsStringifyTransformer || (exports.JsonIsStringifyTransformer = JsonIsStringifyTransformer = {}));
//# sourceMappingURL=JsonIsStringifyTransformer.js.map