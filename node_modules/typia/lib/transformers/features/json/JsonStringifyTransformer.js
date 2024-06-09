"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonStringifyTransformer = void 0;
var JsonStringifyProgrammer_1 = require("../../../programmers/json/JsonStringifyProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var JsonStringifyTransformer;
(function (JsonStringifyTransformer) {
    JsonStringifyTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("json.stringify")(function (project) { return function (modulo) { return JsonStringifyProgrammer_1.JsonStringifyProgrammer.write(project)(modulo); }; });
})(JsonStringifyTransformer || (exports.JsonStringifyTransformer = JsonStringifyTransformer = {}));
//# sourceMappingURL=JsonStringifyTransformer.js.map