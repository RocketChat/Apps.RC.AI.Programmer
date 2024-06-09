"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationCreateAssertGeneralTransformer = void 0;
var NotationAssertGeneralProgrammer_1 = require("../../../programmers/notations/NotationAssertGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationCreateAssertGeneralTransformer;
(function (NotationCreateAssertGeneralTransformer) {
    NotationCreateAssertGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.factory("notations.createAssert".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationAssertGeneralProgrammer_1.NotationAssertGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationCreateAssertGeneralTransformer || (exports.NotationCreateAssertGeneralTransformer = NotationCreateAssertGeneralTransformer = {}));
//# sourceMappingURL=NotationCreateAssertGeneralTransformer.js.map