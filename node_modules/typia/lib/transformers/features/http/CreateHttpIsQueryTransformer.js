"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpIsQueryTransformer = void 0;
var HttpIsQueryProgrammer_1 = require("../../../programmers/http/HttpIsQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpIsQueryTransformer;
(function (CreateHttpIsQueryTransformer) {
    CreateHttpIsQueryTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createIsQuery")(function (project) { return function (modulo) { return HttpIsQueryProgrammer_1.HttpIsQueryProgrammer.write(project)(modulo); }; });
})(CreateHttpIsQueryTransformer || (exports.CreateHttpIsQueryTransformer = CreateHttpIsQueryTransformer = {}));
//# sourceMappingURL=CreateHttpIsQueryTransformer.js.map