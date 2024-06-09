"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpAssertHeadersTransformer = void 0;
var HttpAssertHeadersProgrammer_1 = require("../../../programmers/http/HttpAssertHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpAssertHeadersTransformer;
(function (CreateHttpAssertHeadersTransformer) {
    CreateHttpAssertHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createAssertHeaders")(function (project) { return function (modulo) { return HttpAssertHeadersProgrammer_1.HttpAssertHeadersProgrammer.write(project)(modulo); }; });
})(CreateHttpAssertHeadersTransformer || (exports.CreateHttpAssertHeadersTransformer = CreateHttpAssertHeadersTransformer = {}));
//# sourceMappingURL=CreateHttpAssertHeadersTransformer.js.map