"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpValidateQueryTransformer = void 0;
var HttpValidateQueryProgrammer_1 = require("../../../programmers/http/HttpValidateQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpValidateQueryTransformer;
(function (HttpValidateQueryTransformer) {
    HttpValidateQueryTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.validateQuery")(function (project) { return function (modulo) { return HttpValidateQueryProgrammer_1.HttpValidateQueryProgrammer.write(project)(modulo); }; });
})(HttpValidateQueryTransformer || (exports.HttpValidateQueryTransformer = HttpValidateQueryTransformer = {}));
//# sourceMappingURL=HttpValidateQueryTransformer.js.map