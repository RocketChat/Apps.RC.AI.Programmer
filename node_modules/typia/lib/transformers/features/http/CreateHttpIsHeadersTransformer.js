"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHttpIsHeadersTransformer = void 0;
var HttpIsHeadersProgrammer_1 = require("../../../programmers/http/HttpIsHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var CreateHttpIsHeadersTransformer;
(function (CreateHttpIsHeadersTransformer) {
    CreateHttpIsHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.factory("http.createIsHeaders")(function (project) { return function (modulo) { return HttpIsHeadersProgrammer_1.HttpIsHeadersProgrammer.write(project)(modulo); }; });
})(CreateHttpIsHeadersTransformer || (exports.CreateHttpIsHeadersTransformer = CreateHttpIsHeadersTransformer = {}));
//# sourceMappingURL=CreateHttpIsHeadersTransformer.js.map