"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpIsQueryTransformer = void 0;
var HttpIsQueryProgrammer_1 = require("../../../programmers/http/HttpIsQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpIsQueryTransformer;
(function (HttpIsQueryTransformer) {
    HttpIsQueryTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.isQuery")(function (project) { return function (modulo) { return HttpIsQueryProgrammer_1.HttpIsQueryProgrammer.write(project)(modulo); }; });
})(HttpIsQueryTransformer || (exports.HttpIsQueryTransformer = HttpIsQueryTransformer = {}));
//# sourceMappingURL=HttpIsQueryTransformer.js.map