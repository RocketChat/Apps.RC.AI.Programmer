"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpValidateHeadersTransformer = void 0;
var HttpValidateHeadersProgrammer_1 = require("../../../programmers/http/HttpValidateHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpValidateHeadersTransformer;
(function (HttpValidateHeadersTransformer) {
    HttpValidateHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.validateHeaders")(function (project) { return function (modulo) {
        return HttpValidateHeadersProgrammer_1.HttpValidateHeadersProgrammer.write(project)(modulo);
    }; });
})(HttpValidateHeadersTransformer || (exports.HttpValidateHeadersTransformer = HttpValidateHeadersTransformer = {}));
//# sourceMappingURL=HttpValidateHeadersTransformer.js.map