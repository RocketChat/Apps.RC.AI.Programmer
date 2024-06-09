"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotationValidateGeneralTransformer = void 0;
var NotationValidateGeneralProgrammer_1 = require("../../../programmers/notations/NotationValidateGeneralProgrammer");
var StringUtil_1 = require("../../../utils/StringUtil");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var NotationValidateGeneralTransformer;
(function (NotationValidateGeneralTransformer) {
    NotationValidateGeneralTransformer.transform = function (rename) {
        return GenericTransformer_1.GenericTransformer.scalar("notations.validate".concat(StringUtil_1.StringUtil.capitalize(rename.name)))(function (project) { return function (modulo) {
            return NotationValidateGeneralProgrammer_1.NotationValidateGeneralProgrammer.write(rename)(project)(modulo);
        }; });
    };
})(NotationValidateGeneralTransformer || (exports.NotationValidateGeneralTransformer = NotationValidateGeneralTransformer = {}));
//# sourceMappingURL=NotationValidateGeneralTransformer.js.map