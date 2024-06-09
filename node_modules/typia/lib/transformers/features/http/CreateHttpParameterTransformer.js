"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpParameterTransformer = void 0;
var HttpParameterProgrammer_1 = require("../../../programmers/http/HttpParameterProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpParameterTransformer;
(function (CreateHttpParameterTransformer) {
    CreateHttpParameterTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createParameter")(function (project) { return function (modulo) { return HttpParameterProgrammer_1.HttpParameterProgrammer.write(project)(modulo); }; });
})(CreateHttpParameterTransformer || (exports.CreateHttpParameterTransformer = CreateHttpParameterTransformer = {}));
//# sourceMappingURL=CreateHttpParameterTransformer.js.map