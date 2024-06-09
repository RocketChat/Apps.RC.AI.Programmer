"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAssertQueryTransformer = void 0;
var HttpAssertQueryProgrammer_1 = require("../../../programmers/http/HttpAssertQueryProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpAssertQueryTransformer;
(function (HttpAssertQueryTransformer) {
    HttpAssertQueryTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.assertQuery")(function (project) { return function (modulo) { return HttpAssertQueryProgrammer_1.HttpAssertQueryProgrammer.write(project)(modulo); }; });
})(HttpAssertQueryTransformer || (exports.HttpAssertQueryTransformer = HttpAssertQueryTransformer = {}));
//# sourceMappingURL=HttpAssertQueryTransformer.js.map