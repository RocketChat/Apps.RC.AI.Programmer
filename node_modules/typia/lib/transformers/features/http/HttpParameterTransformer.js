"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpParameterTransformer = void 0;
var HttpParameterProgrammer_1 = require("../../../programmers/http/HttpParameterProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpParameterTransformer;
(function (HttpParameterTransformer) {
    HttpParameterTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.parameter")(function (project) { return function (modulo) { return HttpParameterProgrammer_1.HttpParameterProgrammer.write(project)(modulo); }; });
})(HttpParameterTransformer || (exports.HttpParameterTransformer = HttpParameterTransformer = {}));
//# sourceMappingURL=HttpParameterTransformer.js.map