"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateIsStringifyTransformer = void 0;
var JsonIsStringifyProgrammer_1 = require("../../../programmers/json/JsonIsStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateIsStringifyTransformer;
(function (JsonCreateIsStringifyTransformer) {
    JsonCreateIsStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createIsStringify")(function (project) { return function (modulo) { return JsonIsStringifyProgrammer_1.JsonIsStringifyProgrammer.write(project)(modulo); }; });
})(JsonCreateIsStringifyTransformer || (exports.JsonCreateIsStringifyTransformer = JsonCreateIsStringifyTransformer = {}));
//# sourceMappingURL=JsonCreateIsStringifyTransformer.js.map