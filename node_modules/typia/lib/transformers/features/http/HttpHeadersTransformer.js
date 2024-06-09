"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHeadersTransformer = void 0;
var HttpHeadersProgrammer_1 = require("../../../programmers/http/HttpHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpHeadersTransformer;
(function (HttpHeadersTransformer) {
    HttpHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.headers")(function (project) { return function (modulo) { return HttpHeadersProgrammer_1.HttpHeadersProgrammer.write(project)(modulo); }; });
})(HttpHeadersTransformer || (exports.HttpHeadersTransformer = HttpHeadersTransformer = {}));
//# sourceMappingURL=HttpHeadersTransformer.js.map