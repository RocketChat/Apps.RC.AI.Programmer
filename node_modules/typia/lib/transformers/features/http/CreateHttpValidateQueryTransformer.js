"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpValidateQueryTransformer = void 0;
var HttpValidateQueryProgrammer_1 = require("../../../programmers/http/HttpValidateQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpValidateQueryTransformer;
(function (CreateHttpValidateQueryTransformer) {
    CreateHttpValidateQueryTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createValidateQuery")(function (project) { return function (modulo) { return HttpValidateQueryProgrammer_1.HttpValidateQueryProgrammer.write(project)(modulo); }; });
})(CreateHttpValidateQueryTransformer || (exports.CreateHttpValidateQueryTransformer = CreateHttpValidateQueryTransformer = {}));
//# sourceMappingURL=CreateHttpValidateQueryTransformer.js.map