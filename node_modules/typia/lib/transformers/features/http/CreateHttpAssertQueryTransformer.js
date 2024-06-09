"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpAssertQueryTransformer = void 0;
var HttpAssertQueryProgrammer_1 = require("../../../programmers/http/HttpAssertQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpAssertQueryTransformer;
(function (CreateHttpAssertQueryTransformer) {
    CreateHttpAssertQueryTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createAssertQuery")(function (project) { return function (modulo) { return HttpAssertQueryProgrammer_1.HttpAssertQueryProgrammer.write(project)(modulo); }; });
})(CreateHttpAssertQueryTransformer || (exports.CreateHttpAssertQueryTransformer = CreateHttpAssertQueryTransformer = {}));
//# sourceMappingURL=CreateHttpAssertQueryTransformer.js.map