"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpHeadersTransformer = void 0;
var HttpHeadersProgrammer_1 = require("../../../programmers/http/HttpHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpHeadersTransformer;
(function (CreateHttpHeadersTransformer) {
    CreateHttpHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createHeaders")(function (project) { return function (modulo) { return HttpHeadersProgrammer_1.HttpHeadersProgrammer.write(project)(modulo); }; });
})(CreateHttpHeadersTransformer || (exports.CreateHttpHeadersTransformer = CreateHttpHeadersTransformer = {}));
//# sourceMappingURL=CreateHttpHeadersTransformer.js.map