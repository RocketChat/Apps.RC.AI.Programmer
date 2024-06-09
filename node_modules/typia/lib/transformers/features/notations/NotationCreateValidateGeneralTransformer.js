"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationCreateValidateGeneralTransformer = void 0;
var NotationValidateGeneralProgrammer_1 = require("../../../programmers/notations/NotationValidateGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationCreateValidateGeneralTransformer;
(function (NotationCreateValidateGeneralTransformer) {
    NotationCreateValidateGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.factory("notations.createValidate".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationValidateGeneralProgrammer_1.NotationValidateGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationCreateValidateGeneralTransformer || (exports.NotationCreateValidateGeneralTransformer = NotationCreateValidateGeneralTransformer = {}));
//# sourceMappingURL=NotationCreateValidateGeneralTransformer.js.map