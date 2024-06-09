"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCreateStringifyTransformer = void 0;
var JsonStringifyProgrammer_1 = require("../../../programmers/json/JsonStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonCreateStringifyTransformer;
(function (JsonCreateStringifyTransformer) {
    JsonCreateStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.factory("json.createStringify")(function (project) { return function (modulo) { return JsonStringifyProgrammer_1.JsonStringifyProgrammer.write(project)(modulo); }; });
})(JsonCreateStringifyTransformer || (exports.JsonCreateStringifyTransformer = JsonCreateStringifyTransformer = {}));
//# sourceMappingURL=JsonCreateStringifyTransformer.js.map