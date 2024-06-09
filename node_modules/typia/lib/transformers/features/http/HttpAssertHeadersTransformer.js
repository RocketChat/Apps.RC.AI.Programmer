"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAssertHeadersTransformer = void 0;
var HttpAssertHeadersProgrammer_1 = require("../../../programmers/http/HttpAssertHeadersProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var HttpAssertHeadersTransformer;
(function (HttpAssertHeadersTransformer) {
    HttpAssertHeadersTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("http.assertHeaders")(function (project) { return function (modulo) { return HttpAssertHeadersProgrammer_1.HttpAssertHeadersProgrammer.write(project)(modulo); }; });
})(HttpAssertHeadersTransformer || (exports.HttpAssertHeadersTransformer = HttpAssertHeadersTransformer = {}));
//# sourceMappingURL=HttpAssertHeadersTransformer.js.map