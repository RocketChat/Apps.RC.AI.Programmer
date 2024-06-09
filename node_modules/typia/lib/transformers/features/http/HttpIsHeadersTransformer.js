"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpIsHeadersTransformer = void 0;
var HttpIsHeadersProgrammer_1 = require("../../../programmers/http/HttpIsHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpIsHeadersTransformer;
(function (HttpIsHeadersTransformer) {
    HttpIsHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.isHeaders")(function (project) { return function (modulo) { return HttpIsHeadersProgrammer_1.HttpIsHeadersProgrammer.write(project)(modulo); }; });
})(HttpIsHeadersTransformer || (exports.HttpIsHeadersTransformer = HttpIsHeadersTransformer = {}));
//# sourceMappingURL=HttpIsHeadersTransformer.js.map