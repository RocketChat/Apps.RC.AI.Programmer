"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpQueryTransformer = void 0;
var HttpQueryProgrammer_1 = require("../../../programmers/http/HttpQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpQueryTransformer;
(function (CreateHttpQueryTransformer) {
    CreateHttpQueryTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createQuery")(function (project) { return function (modulo) { return HttpQueryProgrammer_1.HttpQueryProgrammer.write(project)(modulo); }; });
})(CreateHttpQueryTransformer || (exports.CreateHttpQueryTransformer = CreateHttpQueryTransformer = {}));
//# sourceMappingURL=CreateHttpQueryTransformer.js.map