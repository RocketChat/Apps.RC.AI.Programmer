"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpValidateHeadersTransformer = void 0;
var HttpValidateHeadersProgrammer_1 = require("../../../programmers/http/HttpValidateHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpValidateHeadersTransformer;
(function (CreateHttpValidateHeadersTransformer) {
    CreateHttpValidateHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createValidateHeaders")(function (project) { return function (modulo) {
        return HttpValidateHeadersProgrammer_1.HttpValidateHeadersProgrammer.write(project)(modulo);
    }; });
})(CreateHttpValidateHeadersTransformer || (exports.CreateHttpValidateHeadersTransformer = CreateHttpValidateHeadersTransformer = {}));
//# sourceMappingURL=CreateHttpValidateHeadersTransformer.js.map