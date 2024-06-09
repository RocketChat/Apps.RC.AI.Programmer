"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpQueryTransformer = void 0;
var HttpQueryProgrammer_1 = require("../../../programmers/http/HttpQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpQueryTransformer;
(function (HttpQueryTransformer) {
    HttpQueryTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.query")(function (project) { return function (modulo) { return HttpQueryProgrammer_1.HttpQueryProgrammer.write(project)(modulo); }; });
})(HttpQueryTransformer || (exports.HttpQueryTransformer = HttpQueryTransformer = {}));
//# sourceMappingURL=HttpQueryTransformer.js.map